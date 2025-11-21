<template>
  <div class="counter">
    <button 
      class="counter-btn counter-btn--minus" 
      @click="decrement"
      :disabled="count <= min"
    >
      <span class="counter-icon">−</span>
    </button>
    
    <span class="counter-value">{{ count }}</span>
    
    <button 
      class="counter-btn counter-btn--plus" 
      @click="increment"
      :disabled="count >= max"
    >
      <span class="counter-icon">+</span>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Number,
    default: 0
  },
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: Infinity
  },
  step: {
    type: Number,
    default: 1
  }
})

const emit = defineEmits(['update:modelValue'])

const count = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const increment = () => {
  if (count.value < props.max) {
    count.value += props.step
  }
}

const decrement = () => {
  if (count.value > props.min) {
    count.value -= props.step
  }
}
</script>

<style scoped>
.counter {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.counter-btn {
  width: 40px;
  height: 40px;
  border: 1px solid #626575;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.counter-btn:hover:not(:disabled) {
  background: #f8f9fa;
  border-color: #626575;
}

.counter-btn:active:not(:disabled) {
  background: #e9ecef;
  transform: scale(0.95);
}

.counter-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  border-color: #d1d5db;
}

.counter-icon {
  font-size: 20px;
  font-weight: 600;
  color: #626575;
  line-height: 1;
}

.counter-btn:not(:disabled):hover .counter-icon {
  color: #4a4d5a;
}

.counter-value {
  min-width: 40px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  padding: 0 8px;
}
</style>