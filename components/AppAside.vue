<template>
    <div class="news">
        <div class="content">
            <h4>Установки питания серии «PS» вошли в реестр Минпромторга</h4>
            <p>Скачать выписку из реестра можно в разделе Сертификаты</p>
        </div>
        <div class="date">10 июля 2025</div>
    </div>
    <div class="news">
            <div class="content">
                <h4>На Международном форуме «Электрические сети – 2024»</h4>
                <p>Участие в Международном форуме «Электрические сети – 2024», который проходил в МВЦ «Крокус Экспо» с 3 по 5 декабря.</p>
            </div>
            <div class="date">10 июля 2025</div>
            <div class="dots_arrows">
                <Dots /><Arrows />
            </div>
        </div>
    <div class="news">
        <img src="/public/images/news/img.png" alt="">
        <h4>Вышел новый каталог по инверторам напряжения и установкам электропитания </h4>
        <p>Скачать документацию можно в разделе «Листовки, брошюры, каталоги».</p>
    </div>
    <div class="request_form">
        <div class="title">
            <div>Оставьте</div>
            <div>Заявку</div>
        </div>
        <p>И наш менеджер свяжется с вами</p>
        <form @submit.prevent="handleSubmit" class="callback-form">
        <input
            v-model="formData.name"
            type="text"
            id="name"
            :placeholder="errors.name ? errors.name : 'Ваше имя'"
            @blur="validateField('name')"
            :class="{ 'input-error': errors.name }"
        />
        <input
            v-model="formData.phone"
            type="tel"
            id="phone"
            :placeholder="errors.phone ? errors.phone : 'Телефон'"
            @blur="validateField('phone')"
            @input="handlePhoneInput"
            :class="{ 'input-error': errors.phone }"
        />
        <button type="submit" :disabled="isSubmitting">
        Заказать обратный звонок
        </button>

        <div v-if="message" :class="['message', message.type]">
        {{ message.text }}
        </div>
        </form>
    </div>
</template>
<script setup>
import { ref } from 'vue';
const { formatPhone } = usePhoneFormatter();

let formData = ref({
  name: '',
  phone: '',
  email: '', 
  source_id: 3,
});

let errors = ref({
  name: '',
  phone: ''
});

const isSubmitting = ref(false);
const message = ref(null);
let messageTimer = null;

watch(message, (newMsg) => {
  clearTimeout(messageTimer);
  if (newMsg) messageTimer = setTimeout(() => message.value = null, 4000);
});

const handlePhoneInput = (event) => {
  formData.value.phone = formatPhone(event.target.value);
};

const validateField = (field) => {
  errors.value[field] = '';
  
  if (field === 'name' && !formData.value.name.trim()) {
    errors.value.name = 'Укажите имя';
    return false;
  }

  if (field === 'phone') {
  const cleanPhone = formData.value.phone.replace(/\D/g, '');
  
  if (!cleanPhone) {
    errors.value.phone = 'Укажите телефон';
    return false;
  }
  
  if (cleanPhone.length < 11) {
    errors.value.phone = 'Некорректный номер';
    return false;
  }
}
  
  return true;
};

const validateForm = () => {
  let isValid = true;
  Object.keys(formData.value).forEach(field => {
    if (!validateField(field)) {
      isValid = false;
    }
  });
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
      body: JSON.stringify({
        name: formData.value.name,
        phone: cleanPhone,
        sourceId: formData.value.source_id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    message.value = {
      type: 'success',
      text: 'Спасибо! Мы скоро вам перезвоним.'
    };
   
    formData.value.name = '';
    formData.value.phone = '';
    formData.value.email = '';
    
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

h4,p {
    width: 249px;
    text-transform: none;
}
h4 {
    margin-bottom: 10px;
}
img {
    margin-bottom: 20px;
    width: 289px;
    object-fit: cover;
}
p {
    font-size: 14px;
}
.news{
    border-radius: 10px;
    font-size: 14px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.news:not(:nth-child(3)) {
    background: var(--bg);
    padding: 30px 20px;
}
.date{
    padding: 5px 13px;
    background: var(--primary);
    width: fit-content;
    border-radius: 50px;
    color: var(--text-color);
    margin-top: 20px;
}
.request_form {
    padding: 20px;
    background: var(--bg);
    border-radius: 10px;
}
.callback-form {
    margin-top: 24px;
}
.title {
    margin-bottom: 9px;
}
.title div {
    font-size: 30px;
    font-weight: 700;
    line-height: 36px;
    text-transform: uppercase;
    color: var(--primary);
}
.title div:last-child {
    translate: 33%;
}
input {
    display: block;
    width: 100%;
    height: 40px;
    border-radius: 40px;
    background: #fff;
    padding-left: 24px;
    margin-bottom: 10px;
    box-shadow: inset 0 1px 2px 0px rgb(121 128 167 / 40%);
}
button {
    height: 40px;
    border-radius: 40px;
    background: var(--secondary);
    width: 100%;
    color: var(--text-color);
    margin-top: 10px;
}
.dots_arrows {
    display: none;
}

@media (max-width: 768px) {
    .news:nth-child(1) {
            display: none;
    }
    .news, h4, p {
        width: 100%;
    }
    .news {
        margin-bottom: 40px;
    }
    img {
        height: 200px;
        width: 100%;
    }
    .news {
        position: relative;
    }
    .news:nth-child(2) {
        margin-bottom: 100px;
    }
    .dots_arrows {
        left: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        position: absolute;
        bottom: -60px;
        align-items: center;
    }
}

@media (max-width: 380px) {
    
    .news, h4, p {
        width: 100%;
    }
    .request_form {
        width: 100%;
        padding: 30px 20px;
    }
    .title {
        display: flex;
        margin: auto;
        width: fit-content;
    }
    .title div {
        font-size: 24px;
    }
    .title div:last-child {
        translate: none;
        margin-left: 10px;
    }
    .request_form p {
        text-align: center;
        margin-top: 10px;
    }
}
</style>