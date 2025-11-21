<template>
    <div class="form-container" :class="{ 'modal-version': isModal }">
        <h2>Задайте вопрос специалисту</h2>
        <p>И наш менеджер свяжется с вами.&nbsp;&nbsp; Заполните форму и задайте вопрос</p>
        <form @submit.prevent="submitForm">
            <!-- Поле телефона с маской -->
            <PhoneInput v-model="form.phone" :error="errors.phone" />

            <!-- Поле email -->
            <div class="form-group">
                <label>Email</label>
                <input type="email" v-model="form.email" placeholder="your@email.com" :class="{ error: errors.email }">
                <div class="error" v-if="errors.email">{{ errors.email }}</div>
            </div>

            <!-- Текстовая область -->
            <div class="form-group">
                <label>Вопрос</label>
                <textarea v-model="form.message" placeholder="Опишите ваш вопрос подробно"
                    :class="{ error: errors.message }"></textarea>
                <div class="error" v-if="errors.message">{{ errors.message }}</div>
            </div>

            <!-- Чекбоксы -->
            <div class="checkbox-group">
                <label class="checkbox-item">
                    <input type="checkbox" id="privacy" v-model="form.agreedToPrivacy"
                        :class="{ error: errors.agreedToPrivacy }">
                    <span class="checkmark"></span>
                    Я согласен на обработку персональных данных
                </label>
                <div class="error" v-if="errors.agreedToPrivacy">{{ errors.agreedToPrivacy }}</div>

                <label class="checkbox-item">
                    <input type="checkbox" id="newsletter" v-model="form.agreedToNewsletter">
                    <span class="checkmark"></span>
                    Я согласен на рассылку
                </label>
            </div>
            <button type="submit" :disabled="isSubmitting">Отправить запрос</button>
            <div class="success-message" v-if="submitSuccess">
                Спасибо! Ваш запрос успешно отправлен. Мы свяжемся с вами в ближайшее время.
            </div>
        </form>
    </div>
</template>

<script setup>
const { validateForm } = useFormValidation();
const { formatPhone } = usePhoneFormatter();

const form = reactive({
    phone: '',
    email: '',
    message: '',
    source_id: 1,
    agreedToPrivacy: false,
    agreedToNewsletter: false
});

const errors = ref({});
const isSubmitting = ref(false);
const submitSuccess = ref(false);

// Валидация формы
const validateFormLocal = () => {
    const validation = validateForm(form);
    errors.value = validation.errors;
    return validation.isValid;
};

// Отправка формы
const submitForm = async () => {
    if (!validateFormLocal()) {
        return;
    }

    isSubmitting.value = true;

    try {
        const { data, error } = await useFetch('/api/leads', {
            method: 'POST',
            body: {
                phone: form.phone,
                email: form.email,
                message: form.message,
                sourceId: form.source_id,
            }
        });

        if (error.value) {
            throw new Error(error.value.data?.message || 'Ошибка при отправке формы');
        }

        submitSuccess.value = true;

        form.phone = '';
        form.email = '';
        form.message = '';
        form.agreedToPrivacy = false;
        form.agreedToNewsletter = false;

        errors.value = {};

        setTimeout(() => {
            submitSuccess.value = false;
        }, 5000);
    } catch (error) {
        console.error('Ошибка при отправке формы:', error);
        alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.');
    } finally {
        isSubmitting.value = false;
    }
};

defineProps({
    isModal: {
        type: Boolean,
        default: false
    }
});
</script>

<style scoped>
.form-container {
    width: 277px;
    background: var(--bg);
    border-radius: 10px;
}

.form-container.modal-version {
    width: 320px;
}

h2 {
    margin: auto;
    text-align: center;
    font-size: 24px;
    width: 237px;
    padding: 20px 0 15px;
}

p {
    width: 242px;
    text-align: center;
    font-size: 14px;
    margin: 0 auto 15px;
}

form {
    padding: 0 20px 30px;
}

.form-group {
    width: 100%;
}

.form-group+.form-group {
    margin-top: 10px;
}

label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #374151;
    font-size: 14px;
}

input,
textarea {
    height: 40px;
    border-radius: 50px;
    padding-left: 28px;
    background: #fff;
    box-shadow: inset 0 1px 2px 0px rgba(121, 128, 167, 0.4);
    width: 100%;
    padding: 12px 24px;
    border: 1px solid #d1d5db;
    transition: border-color 0.2s;
}

input:focus,
textarea:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

textarea {
    min-height: 90px;
    resize: vertical;
    border-radius: 10px;
}

.error {
    color: #ef4444;
    font-size: 14px;
    margin-top: 5px;
}

input.error,
textarea.error {
    border-color: #ef4444;
}

.checkbox-group {
    margin: 20px 0;
}

.checkbox-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 12px;
}

.checkbox-item input {
    margin-top: 2px;
    margin-right: 12px;
    width: 20px;
    height: 20px;
}

.checkbox-item label {
    width: 15vw;
}

.required {
    color: #ef4444;
}

button {
    width: 100%;
    height: 40px;
    padding: 12px;
    font-size: 14px;
    background: var(--secondary);
    color: var(--text-color);
    border-radius: 50px;
    cursor: pointer;
    transition: background-color 0.2s;
}

button:hover:not(:disabled) {
    background: var(primary);
}

button:disabled {
    background: #9ca3af;
    cursor: not-allowed;
}

.checkbox-item {
    display: block;
    position: relative;
    padding-left: 30px;
    cursor: pointer;
    font-size: 14px;
}

.checkbox-item input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

.checkbox-item .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #626575;
}

.checkbox-item .checkmark:after {
    content: "";
    position: absolute;
    display: none;
    left: 4px;
    top: 5.5px;
    width: 12px;
    height: 8px;
    background: url(/public/images/checkmark.svg) center;
}

.checkbox-item input:checked~.checkmark:after {
    display: block;
}

@media (max-width:1280px) {
    .form-container {
        margin: auto;
        min-width: 277px;
    }
}

@media (max-width: 1024px) {
    .form-container {
        min-width: 277px;
    }
}

@media (max-width: 380px) {
    .form-container {
        width: 100%;
    }

    .form-container.modal-version {
        width: 100%;
    }
}
/* Глубокие селекторы для дочерних компонентов */
::v-deep(.form-group) {
  margin-bottom: 15px;
  width: 100%;
}

::v-deep(.form-group label) {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #374151;
  font-size: 14px;
}

::v-deep(.form-group input) {
  height: 40px;
  border-radius: 50px;
  padding-left: 28px;
  background: #fff;
  box-shadow: inset 0 1px 2px 0px rgba(121, 128, 167, 0.4);
  width: 100%;
  padding: 12px 24px;
  border: 1px solid #d1d5db;
  transition: border-color 0.2s;
}

::v-deep(.form-group input:focus) {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

::v-deep(.form-group input.error) {
  border-color: #ef4444;
}

::v-deep(.form-group .error) {
  color: #ef4444;
  font-size: 14px;
  margin-top: 5px;
}
</style>