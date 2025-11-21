<template>
  <div class="buy-modal" v-if="isVisible" @click.self="closeModal">
    <div class="modal-content">
      <button class="close-btn" @click="closeModal">×</button>
      
      <h2>Оформление заявки</h2>
      <p>Продукт:&nbsp;<strong>{{ product.name }}</strong></p>
      
      <form @submit.prevent="handleSubmit" class="buy-form">
        <div class="form-group">
          <label for="name">Ваше имя *</label>
          <input 
            v-model="formData.name" 
            type="text" 
            id="name"
            :class="{ 'input-error': errors.name }"
          />
          <span v-if="errors.name" class="error-text">{{ errors.name }}</span>
        </div>

        <div class="form-group">
          <label for="phone">Телефон *</label>
          <PhoneInput
            v-model="formData.phone"
            label=""
            ref="phoneInputRef"
            placeholder="+7 (___)-___-__-__"
            :class="{ 'input-error': errors.phone }"
          />
          <span v-if="errors.phone" class="error-text">{{ errors.phone }}</span>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input 
            v-model="formData.email" 
            type="email" 
            id="email"
            placeholder="example@mail.ru"
          />
        </div>

        <button type="submit" :disabled="isSubmitting" class="submit-btn">
          {{ 'Отправить заявку' }}
        </button>

        <div v-if="message" :class="['message', message.type]">
          {{ message.text }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'success'])

const isVisible = ref(false)
const isSubmitting = ref(false)
const message = ref(null)
const phoneInputRef = ref()

const formData = ref({
  name: '',
  phone: '',
  email: ''
})

const errors = ref({
  name: '',
  phone: ''
})

// Показ/скрытие модального окна
const showModal = () => {
  console.log('Show modal called with product:', props.product)
  isVisible.value = true
}

const closeModal = () => {
  isVisible.value = false
  resetForm()
  emit('close')
}

const resetForm = () => {
  formData.value = {
    name: '',
    phone: '',
    email: ''
  }
  errors.value = {
    name: '',
    phone: ''
  }
  message.value = null
}

const validateForm = () => {
  let isValid = true
  errors.value = { name: '', phone: '' }

  if (!formData.value.name.trim()) {
    errors.value.name = 'Введите ваше имя'
    isValid = false
  }

  const isPhoneValid = phoneInputRef.value?.validate()
  if (!isPhoneValid) {
    errors.value.phone = 'Введите корректный номер телефона'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true
  message.value = null

  try {
    const cleanPhone = formData.value.phone.replace(/\D/g, '')

    const response = await $fetch('/api/leads/with-products', {
      method: 'POST',
      body: {
        name: formData.value.name,
        phone: cleanPhone,
        email: formData.value.email,
        productIds: [props.product.id],
        sourceId: 3
      }
    })

    message.value = {
      type: 'success',
      text: 'Заявка отправлена! Мы свяжемся с вами в ближайшее время.'
    }

    setTimeout(() => {
      emit('success', response.leadId)
      closeModal()
    }, 2000)

  } catch (error) {
    console.error('Ошибка отправки заявки:', error)
    message.value = {
      type: 'error',
      text: 'Произошла ошибка. Пожалуйста, попробуйте позже.'
    }
  } finally {
    isSubmitting.value = false
  }
}

defineExpose({
  showModal,
  closeModal
})
</script>

<style scoped>
.buy-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.input-error {
  border-color: #ff4444;
}

.error-text {
  color: #ff4444;
  font-size: 12px;
  margin-top: 5px;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.message.success {
  color: green;
  margin-top: 10px;
}

.message.error {
  color: red;
  margin-top: 10px;
}
</style>