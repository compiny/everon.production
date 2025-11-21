<template>
  <div id="callback" class="bg">
    <div class="container">
      <div class="title">
        <div>Остались</div>
        <div>вопросы?</div>
      </div>
      <div class="operator"></div>

      <p>Если у вас есть вопросы, наш специалист ответит на все вопросы по телефону</p>
      <p class="numb">+7 953 861 79 20</p>
      <p>Или оставьте свои данные и наш специалист свяжется с вами</p>

      <form @submit.prevent="handleSubmit" class="callback-form">
        <input v-model="formData.name" type="text" id="name" :placeholder="errors.name ? errors.name : 'Ваше имя'"
         :class="{ 'input-error': errors.name }" />
        <!-- <input
            v-model="formData.phone"
            type="tel"
            id="phone"
            :placeholder="errors.phone ? errors.phone : 'Телефон'"
            @blur="validateField('phone')"
            :class="{ 'input-error': errors.phone }"
        /> -->
        <PhoneInput
          v-model="formData.phone"
          ref="phoneInputRef"
          :label="null" 
          placeholder="Телефон"
        />

        <button type="submit" :disabled="isSubmitting">
          Заказать обратный звонок
        </button>

        <div v-if="message" :class="['message', message.type, message.type === 'success' ? 'success-message' : '']">
          {{ message.text }}
        </div>
      </form>
    </div>
    <div class="operator-mob"></div>

  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const formData = ref({
  name: '',
  phone: '',
  source_id: 3,
});

const errors = ref({
  name: '',
  phone: ''
});

const isSubmitting = ref(false);
const message = ref(null);
const phoneInputRef = ref();
let messageTimer = null;

// Вотчер для автоматического скрытия сообщения
watch(message, (newMessage) => {
  clearTimeout(messageTimer);
  
  // Если есть новое сообщение, устанавливаем таймер на 4 секунды
  if (newMessage) {
    messageTimer = setTimeout(() => {
      message.value = null;
    }, 3000);
  }
});

const validateField = (field) => {
  errors.value[field] = '';

  if (field === 'name' && !formData.value.name.trim()) {
    errors.value.name = 'Укажите имя';
    return false;
  }

  return true;
};

const validateForm = () => {
  let isValid = true;
  
  // Валидация имени
  if (!validateField('name')) {
    isValid = false;
  }

  // Валидация телефона через компонент
  const isPhoneValid = phoneInputRef.value?.validate();
  if (!isPhoneValid) {
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;
  message.value = null;

  try {
    const cleanPhone = formData.value.phone.replace(/\D/g, '');

    const response = await $fetch('/api/leads', {
      method: 'POST',
      body: {
        name: formData.value.name,
        phone: cleanPhone,
        sourceId: formData.value.source_id
      }
    });

    message.value = {
      type: 'success',
      text: 'Спасибо! Мы скоро вам перезвоним.'
    };

    // Очистка формы
    formData.value.name = '';
    formData.value.phone = '';
    errors.value.name = '';

  } catch (err) {
    console.error('Ошибка отправки:', err);
    message.value = {
      type: 'error',
      text: 'Произошла ошибка. Пожалуйста, попробуйте позже.'
    };
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.bg {
  background: var(--primary);
  width: 100%;
}

.container {
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
}

.title {
  width: 883px;
  margin: 50px auto 32px;
}

.title div {
  font-size: 96px;
  line-height: 60px;
  color: var(--text-color);
  font-weight: bold;
}

.title div:last-child {
  margin-left: 222px;
}

p {
  color: var(--text-color);
  line-height: 22px;
  text-align: center;
}

.operator {
  position: absolute;
  top: -152px;
  left: -238px;
  background: url(/public/images/operator.png) no-repeat;
  width: 585px;
  height: 585px;
}

.operator-mob {
  display: none;
}

.numb {
  font-weight: 700;
  font-size: 32px;
  line-height: 38px;
}

.callback-form {
  position: relative;
  display: flex;
  gap: 20px;
  z-index: 1001;
  margin: 23px 0;
}

::v-deep(.error) {
  position: absolute;
}

::v-deep(input) {
  width: 277px;
  height: 50px;
  border-radius: 50px;
  padding-left: 28px;
  background: #fff;
  box-shadow: inset 0 1px 2px 1px rgb(63 75 144 / 50%);
}

button {
  color: var(--text-color);
  background: var(--secondary);
  border-radius: 50px;
  height: 50px;
  width: 277px;
}

.message.success {
  position: absolute;
  top: -30px;
  left: 30%;
  background-color: #d1fae5;
  color: #065f46;
  border: 1px solid #a7f3d0;
}

.input-error::placeholder {
  color: rgb(203, 40, 40);
}

@media(max-width: 1360px) {
  .operator {
    display: none;
  }
}

@media(max-width: 1024px) {
  .callback-form {
    width: 280px;
    flex-wrap: wrap;
  }

  .title {
    width: fit-content;
  }
}

@media(max-width: 768px) {
  .title div {
    font-size: 10vw;
    width: fit-content;
  }

  .title div:last-child {
    margin-left: 170px;
  }
}

@media (max-width: 640px) {
  .title div {
    line-height: 41px;
  }

  .title div:last-child {
    margin-left: 130px;
  }

  .operator-mob {
    margin-top: -100px;
    display: block;
    background: url(/public/images/mob-operator.png) no-repeat center center;
    width: 100%;
    height: 436px;
  }
}

@media (max-width:380px) {
  .title div {
    font-size: 40px;
  }

  .title div:last-child {
    line-height: 31px;
    margin-left: 103px;
  }

}
</style>
