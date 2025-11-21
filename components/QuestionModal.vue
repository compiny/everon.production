<template>
  <transition name="modal">
    <div v-if="isVisible" class="modal-overlay">
        <div class="modal">
            <button class="modal-close" @click="closeModal"></button>
            <div class="modal-content">
                <FormCuestion :is-modal="true"/>
            </div>
        </div>
    </div>
  </transition>
</template>

<script setup>
import FormCuestion from './FormCuestion.vue';

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:isVisible', 'close']);

const closeModal = () => {
  emit('update:isVisible', false);
  emit('close');
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
  padding: 20px;
}

.modal {
    position: relative;
}

.modal-content {
    padding-top: 20px;
    background: var(--bg);
    border-radius: 10px;
    max-height: 90vh; 
    max-width: 90vw; 
    overflow-y: auto; 
    overflow-x: hidden;
}

.modal-close {
  background: url(/public/images/close.svg) no-repeat;
  width: 40px;
  height: 40px;
  display: block;
  position: absolute;
  top: 0;
  left: 50%;
  translate: -50% -50%;
  z-index: 1200;
}

/* Анимации */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.95) translateY(-20px);
}


@media (max-width: 768px) {
  .modal-content {
    max-width: 95%;
    margin: auto;
  }
}
</style>