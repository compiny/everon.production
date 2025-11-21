<template>
  <div class="product-attributes">
    <h3>Характеристики товара</h3>
    
    <div v-for="(attribute, index) in attributes" :key="index" class="attribute-row">
      <input 
        v-model="attribute.name" 
        type="text" 
        placeholder="Название характеристики"
        class="attribute-name"
        @click.stop
      />
      <input 
        v-model="attribute.value" 
        type="text" 
        placeholder="Значение"
        class="attribute-value"
        @click.stop
      />
      <button @click.stop="removeAttribute(index)" class="remove-btn">×</button>
    </div>
    
    <button @click.stop="addAttribute" class="add-attribute-btn">+ Добавить характеристику</button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  initialAttributes: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['change'])

const attributes = ref([...props.initialAttributes])

if (attributes.value.length === 0) {
  attributes.value.push({ name: '', value: '' })
}

// Метод для получения данных для сохранения
const getCharacteristicsForSave = () => {
  return attributes.value.filter(attr => {
    // Проверяем, что name и value существуют и являются строками
    const name = typeof attr.name === 'string' ? attr.name.trim() : ''
    const value = typeof attr.value === 'string' ? attr.value.trim() : ''
    return name !== '' && value !== ''
  }).map(attr => ({
    // Убедимся, что сохраняем именно строки
    name: String(attr.name).trim(),
    value: String(attr.value).trim()
  }))
}

// Метод для сброса характеристик
const resetCharacteristics = () => {
  attributes.value = [{ name: '', value: '' }]
  emit('change', [])
}

// Метод для установки характеристик (для редактирования)
const setCharacteristics = (newAttributes) => {
  if (newAttributes && newAttributes.length > 0) {
    attributes.value = [...newAttributes]
  } else {
    attributes.value = [{ name: '', value: '' }]
  }
}

// Метод для добавления новой характеристики
const addAttribute = (event) => {
  event.preventDefault()
  event.stopPropagation()
  attributes.value.push({ name: '', value: '' })
}

// Метод для удаления характеристики
const removeAttribute = (index, event) => {
  if (event) {
    event.preventDefault()
    event.stopPropagation()
  }
  attributes.value.splice(index, 1)
  if (attributes.value.length === 0) {
    attributes.value.push({ name: '', value: '' })
  }
}

watch(attributes, (newVal) => {
  emit('change', getCharacteristicsForSave())
}, { deep: true })

defineExpose({
  getCharacteristicsForSave,
  resetCharacteristics,
  setCharacteristics
})
</script>
<style scoped>
.product-attributes {
  margin-bottom: 20px;
}

.section-label {
  display: block;
  font-weight: bold;
  margin-bottom: 12px;
  color: #333;
}

.attribute-row {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  align-items: center;
}

.attribute-name {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.attribute-value {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.remove-btn {
  padding: 8px 12px;
  background: #ff4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-attribute-btn {
  padding: 10px 16px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.no-attributes {
  text-align: center;
  padding: 20px;
  color: #888;
  font-style: italic;
}
</style>