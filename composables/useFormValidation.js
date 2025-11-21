export const useFormValidation = () => {
  // Валидация телефона
  const validatePhone = (phone) => {
    const errors = [];
    const phoneDigits = phone.replace(/\D/g, '');
    
    if (!phone) {
      errors.push('Телефон обязателен для заполнения');
    } else if (phoneDigits.length !== 11) {
      errors.push('Введите корректный номер телефона');
    }
    
    return errors;
  };

  // Валидация email
  const validateEmail = (email) => {
    const errors = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
      errors.push('Email обязателен для заполнения');
    } else if (!emailRegex.test(email)) {
      errors.push('Введите корректный email адрес');
    }
    
    return errors;
  };

  // Валидация текста
  const validateText = (text, fieldName = 'Поле', minLength = 1) => {
    const errors = [];
    
    if (!text) {
      errors.push(`${fieldName} обязательно для заполнения`);
    } else if (text.length < minLength) {
      errors.push(`${fieldName} должно содержать не менее ${minLength} символов`);
    }
    
    return errors;
  };

  // Валидация чекбокса
  const validateCheckbox = (isChecked, fieldName = 'Согласие') => {
    const errors = [];
    
    if (!isChecked) {
      errors.push(`Необходимо ваше ${fieldName.toLowerCase()}`);
    }
    
    return errors;
  };

  // Комплексная валидация формы
  const validateForm = (formData, rules = {}) => {
    const errors = {};
    
    // Правила по умолчанию
    const defaultRules = {
      phone: { required: true, validate: validatePhone },
      email: { required: true, validate: validateEmail },
      message: { 
        required: true, 
        validate: (value) => validateText(value, 'Описание', 10) 
      },
      agreedToPrivacy: { 
        required: true, 
        validate: (value) => validateCheckbox(value, 'согласие на обработку данных') 
      }
    };
    
    // Объединяем с пользовательскими правилами
    const validationRules = { ...defaultRules, ...rules };
    
    // Проверяем каждое поле
    Object.keys(validationRules).forEach(field => {
      const rule = validationRules[field];
      
      if (rule.required || formData[field]) {
        const fieldErrors = rule.validate(formData[field]);
        if (fieldErrors.length > 0) {
          errors[field] = fieldErrors[0];
        }
      }
    });
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  return {
    validatePhone,
    validateEmail,
    validateText,
    validateCheckbox,
    validateForm
  };
};