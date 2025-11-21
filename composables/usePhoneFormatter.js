export const usePhoneFormatter = () => {
  const formatPhone = (inputValue) => {
    console.log('Input to formatPhone:', inputValue); 
    
    // Удаляем ВСЕ нецифровые символы
    let value = inputValue.replace(/\D/g, '');
    console.log('After removing non-digits:', value); 
    
    // Ограничиваем длину до 11 цифр
    if (value.length > 11) {
      value = value.slice(0, 11);
    }
    
    if (value.length === 0) {
      return '';
    }
    
    // Заменяем 8 на 7 в начале
    if (value.startsWith('8')) {
      value = '7' + value.slice(1);
    }
    
    // Если номер не начинается с 7, добавляем 7
    if (!value.startsWith('7')) {
      value = '7' + value;
      // Снова ограничиваем длину
      if (value.length > 11) {
        value = value.slice(0, 11);
      }
    }
    
    // Форматируем номер
    let formattedValue = '+7';
    
    if (value.length > 1) {
      formattedValue += ' (' + value.slice(1, 4);
    }
    if (value.length >= 5) {
      formattedValue += ') ' + value.slice(4, 7);
    }
    if (value.length >= 8) {
      formattedValue += '-' + value.slice(7, 9);
    }
    if (value.length >= 10) {
      formattedValue += '-' + value.slice(9, 11);
    }
    
    console.log('Final formatted:', formattedValue); 
    return formattedValue;
  };

  return {
    formatPhone
  };
};
