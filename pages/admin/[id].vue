<template>
  <div class="lead-detail-page">
    <div class="page-header">
      <button @click="goBack" class="back-btn">← Назад</button>
      <h1>Заявка #{{ lead?.id }}</h1>
    </div>

    <div v-if="pending" class="loading">Загрузка...</div>
    <div v-else-if="error" class="error">Ошибка: {{ error.message }}</div>
    <div v-else-if="lead" class="lead-details">
      <div class="detail-card">
        <h3>Основная информация</h3>
        <div class="detail-grid">
          <div class="detail-item">
            <label>Имя:</label>
            <span>{{ lead.name || '-' }}</span>
          </div>
          <div class="detail-item">
            <label>Email:</label>
            <span>{{ lead.email || '-' }}</span>
          </div>
          <div class="detail-item">
            <label>Телефон:</label>
            <span>{{ lead.phone || '-' }}</span>
          </div>
          <div class="detail-item">
            <label>Источник:</label>
            <span>{{ getSourceName(lead.sourceId) || '-' }}</span>
          </div>
          <div class="detail-item">
            <label>Дата создания:</label>
            <span>{{ formatDate(lead.createdAt) }}</span>
          </div>
        </div>
      </div>

      <div class="detail-card" v-if="lead.message">
        <h3>Сообщение</h3>
        <p class="message-content">{{ lead.message }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()
const router = useRouter()
const leadId = ref(route.params.id)

// Загрузка данных заявки
const { data: leadData, pending, error } = await useFetch(`/api/leads/${leadId.value}`)

const lead = computed(() => leadData.value?.lead)

// Загрузка источников для отображения названия
const { data: sourcesData } = await useFetch('/api/sources')
const sources = computed(() => sourcesData.value?.sources || [])

const getSourceName = (sourceId) => {
  if (!sources.value.length || !sourceId) return '-'
  const source = sources.value.find(s => s.id === sourceId)
  return source ? source.name : '-'
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const goBack = () => {
  router.back()
}
</script>

<style scoped>
h3 {
    padding-bottom: 20px;
}
.lead-detail-page {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
}

.back-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 6px;
  cursor: pointer;
}

.back-btn:hover {
  background: #2563eb;
}

.lead-details {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.detail-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 15px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.detail-item label {
  font-weight: 600;
  color: #374151;
}

.detail-item span {
  color: #6b7280;
}

.message-content {
    word-break: break-word;
    padding-top: 20px;
}

.loading, .error {
  text-align: center;
  padding: 40px;
  font-size: 18px;
}

.error {
  color: #ef4444;
}
</style>