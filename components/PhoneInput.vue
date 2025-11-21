<template>
  <div class="form-group">
    <label v-if="label">{{ label }}</label>
    <input 
      type="text" 
      :value="modelValue" 
      :placeholder="placeholder" 
      @input="handleInput"
    />
    <div class="error" v-if="internalError">{{ internalError }}</div>
  </div>
</template>

<script setup>
import { usePhoneFormatter } from '~/composables/usePhoneFormatter';
import { ref } from 'vue';

const { formatPhone } = usePhoneFormatter();

const props = defineProps({
  modelValue: String,
  label: {
    type: String,
    default: 'Телефон'
  },
  placeholder: {
    type: String,
    default: '+7 (___) ___-__-__'
  },
  required: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['update:modelValue', 'validation']);

const internalError = ref('');

const handleInput = (event) => {
  const formattedPhone = formatPhone(event.target.value);
  emit('update:modelValue', formattedPhone);
  event.target.value = formattedPhone;
  
  // Сбрасываем ошибку при вводе
  if (internalError.value) {
    internalError.value = '';
    emit('validation', true);
  }
};


// Функция валидации
const validate = () => {
  const cleanPhone = props.modelValue?.replace(/\D/g, '') || '';
  
  if (props.required && !cleanPhone) {
    internalError.value = 'Укажите телефон';
    emit('validation', false);
    return false;
  }
  
  if (cleanPhone && cleanPhone.length < 11) {
    internalError.value = 'Некорректный номер';
    emit('validation', false);
    return false;
  }
  
  internalError.value = '';
  emit('validation', true);
  return true;
};

// Экспортируем функцию валидации для родителя
const validateField = () => {
  return validate();
};

defineExpose({
  validate: validateField
});
</script>
<!-- <template>
  <div class="form-group">
    <label v-if="label">{{ label }}</label>
    <input 
      type="text" 
      :value="modelValue" 
      :placeholder="placeholder" 
      @input="handleInput"
      :class="{ error: error }" 
    />
    <div class="error" v-if="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { usePhoneFormatter } from '~/composables/usePhoneFormatter';
const { formatPhone } = usePhoneFormatter();

const props = defineProps({
  modelValue: String,
  label: {
    type: String,
    default: 'Телефон'
  },
  placeholder: {
    type: String,
    default: '+7 (___) ___-__-__'
  },
  error: String
});

const emit = defineEmits(['update:modelValue']);

const handleInput = (event) => {
  const formattedPhone = formatPhone(event.target.value);
  emit('update:modelValue', formattedPhone);
  event.target.value = formattedPhone;
};

</script> -->