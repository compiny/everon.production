<template>
  <button @click="openModal" class="buy-btn" :disabled="isLoading">
    Купить
  </button>

  <BuyProductModal 
    v-if="selectedProduct"
    ref="buyModalRef"
    :product="selectedProduct"
    @close="onModalClose"
    @success="onOrderSuccess"
  />
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['success'])

const buyModalRef = ref()
const selectedProduct = ref(null)
const isLoading = ref(false)

const openModal = () => {
  selectedProduct.value = props.product
  nextTick(() => {
    buyModalRef.value?.showModal()
  })
}

const onModalClose = () => {
  selectedProduct.value = null
}

const onOrderSuccess = (leadId) => {
  selectedProduct.value = null
  emit('success', leadId)
}
</script>
<style scoped>
button {
  height: 40px;
  background:url(/public/images/cart.svg)77px center no-repeat, var(--secondary);
  color: #fff;
  border-radius: 40px;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 16px;
  margin-top: 20px;
  padding-left: 30px;
}
</style>