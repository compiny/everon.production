<template>
  <div>
    <div class="btn" @click="openModal">
      <QuestionBtn />
    </div>
    <QuestionModal 
      :is-visible="isModalOpen" 
      @update:isVisible="isModalOpen = $event" 
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import QuestionModal from './QuestionModal.vue';
import QuestionBtn from './QuestionBtn.vue'; 

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

</script>