<template>
  <div class="container">
    <div class="page-header">
      <h1>Источники заявок</h1>
      <button @click="showAddModal = true" class="add-btn">
        + Добавить источник
      </button>
    </div>

    <div v-if="pending" class="loading">
      <div class="spinner"></div>
      <p>Загрузка источников...</p>
    </div>

    <div v-else-if="error" class="error">
      <div class="error-alert">
        <h3>Ошибка загрузки</h3>
        <p>{{ error.message }}</p>
      </div>
      <button @click="loadData" class="retry-btn">
        Попробовать снова
      </button>
    </div>

    <div v-else>
      <!-- Статистика -->
      <div class="stats-grid">
        <div class="stat-card">
          Всего: {{ sources.length }}
        </div>
      </div>

      <!-- Таблица источников -->
      <div class="table-card">
        <div class="table-header">
          <div class="search-input">
            <input
              v-model="searchQuery"
              placeholder="Поиск по названию..."
              type="text"
            />
            <span class="search-icon">🔍</span>
          </div>
        </div>

        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th v-for="column in columns" :key="column.key" class="table-header-cell">
                  {{ column.label }}
                </th>
                <th class="table-header-cell">Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="source in filteredSources" :key="source.id" class="table-row">
                <td>{{ source.id }}</td>
                <td>{{ source.name }}</td>
                <td>{{ formatDate(source.createdAt) }}</td>
                <td>
                  <div class="action-buttons">
                    <button 
                      @click="editSource(source)" 
                      class="edit-btn"
                      title="Редактировать источник"
                    >
                      ✏️
                    </button>
                    <button 
                      @click="deleteSource(source.id)" 
                      class="delete-btn"
                      title="Удалить источник"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          
          <div v-if="filteredSources.length === 0" class="empty-state">
            <p>Источники не найдены</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Модальное окно подтверждения удаления -->
    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="modal">
        <h3>Подтверждение удаления</h3>
        <p>Вы уверены, что хотите удалить источник "{{ sourceToDelete?.name }}"?</p>
        <div class="modal-actions">
          <button @click="confirmDelete" class="btn-danger">Удалить</button>
          <button @click="cancelDelete" class="btn-cancel">Отмена</button>
        </div>
      </div>
    </div>

    <!-- Модальное окно добавления/редактирования -->
    <div v-if="showAddModal || showEditModal" class="modal-overlay">
      <div class="modal">
        <h3>{{ isEditing ? 'Редактирование' : 'Добавление' }} источника</h3>
        
        <form @submit.prevent="saveSource" class="source-form">
          <div class="form-group">
            <label for="sourceName">Название источника:</label>
            <input
              id="sourceName"
              v-model="form.name"
              type="text"
              required
              placeholder="Введите название источника"
              :disabled="saving"
            />
          </div>

          <div v-if="formError" class="error-message">
            {{ formError }}
          </div>

          <div class="form-actions">
            <button 
              type="submit" 
              class="btn-primary"
              :disabled="saving || !form.name.trim()"
            >
              <span v-if="saving">Сохранение...</span>
              <span v-else>{{ isEditing ? 'Сохранить' : 'Добавить' }}</span>
            </button>
            <button 
              type="button" 
              @click="closeModal" 
              class="btn-cancel"
              :disabled="saving"
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard' 
})

// Колонки таблицы
const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Название' },
  { key: 'createdAt', label: 'Дата создания' }
]

// Состояния
const searchQuery = ref('')
const sources = ref([])
const pending = ref(false)
const error = ref(null)
const showDeleteModal = ref(false)
const showAddModal = ref(false)
const showEditModal = ref(false)
const saving = ref(false)
const formError = ref('')
const sourceToDelete = ref(null)

// Форма
const form = ref({
  id: null,
  name: ''
})

// Вычисляемые свойства
const isEditing = computed(() => !!form.value.id)
const filteredSources = computed(() => {
  if (!sources.value.length) return []
  
  return sources.value.filter(source =>
    source.name && source.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Загрузка данных
const loadData = async () => {
  try {
    pending.value = true
    error.value = null
    const response = await $fetch('/api/sources')
    
    // Обрабатываем разные форматы ответа
    if (Array.isArray(response)) {
      sources.value = response
    } else if (response && Array.isArray(response.sources)) {
      sources.value = response.sources
    } else if (response && Array.isArray(response.data)) {
      sources.value = response.data
    } else {
      sources.value = []
    }
  } catch (err) {
    console.error('Error fetching lead sources:', err)
    error.value = err
  } finally {
    pending.value = false
  }
}

// Загружаем данные при монтировании
onMounted(loadData)

// Форматирование даты
const formatDate = (dateString) => {
    return dateString.replace('T', ' ').replace('.000Z', '')
}

// Удаление источника
const deleteSource = (id) => {
  const source = sources.value.find(s => s.id === id)
  if (source) {
    sourceToDelete.value = source
    showDeleteModal.value = true
  }
}

// Редактирование источника
const editSource = (source) => {
  form.value = { ...source }
  formError.value = ''
  showEditModal.value = true
}

// Добавление источника
const addSource = () => {
  form.value = { id: null, name: '' }
  formError.value = ''
  showAddModal.value = true
}

// Сохранение источника
const saveSource = async () => {
  try {
    saving.value = true
    formError.value = ''

    if (isEditing.value) {
      // Редактирование существующего источника
      const response = await $fetch(`/api/sources/${form.value.id}`, {
        method: 'PUT',
        body: { name: form.value.name },
        headers: {
          'Content-Type': 'application/json'
        }
      })

      // Обновляем источник в локальном списке
      const index = sources.value.findIndex(s => s.id === form.value.id)
      if (index !== -1) {
        sources.value[index] = { ...sources.value[index], name: form.value.name }
      }
    } else {
      // Добавление нового источника
      console.log('Creating source with name:', form.value.name)
      
      const response = await $fetch('/api/sources', {
        method: 'POST',
        body: { name: form.value.name },
        headers: {
          'Content-Type': 'application/json'
        }
      })

      console.log('Server response:', response)

      // Проверяем ответ сервера
      if (response.success) {
        // Добавляем новый источник в начало списка
        sources.value.unshift(response.data)
      } else {
        throw new Error(response.error || 'Ошибка при создании источника')
      }
    }

    closeModal()
    
  } catch (error) {
    console.error('Error saving source:', error)
    formError.value = error.data?.error || error.data?.message || error.message || 'Ошибка при сохранении источника'
  } finally {
    saving.value = false
  }
}

// Подтверждение удаления
const confirmDelete = async () => {
  try {
    await $fetch(`/api/sources/${sourceToDelete.value.id}`, {
      method: 'DELETE'
    })

    // Удаляем источник из локального списка
    sources.value = sources.value.filter(source => source.id !== sourceToDelete.value.id)
    
    showDeleteModal.value = false
    sourceToDelete.value = null
    
  } catch (error) {
    console.error('Error deleting source:', error)
    alert(error.data?.message || 'Ошибка при удалении источника')
  }
}

// Закрытие модальных окон
const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  form.value = { id: null, name: '' }
  formError.value = ''
}

const cancelDelete = () => {
  showDeleteModal.value = false
  sourceToDelete.value = null
}
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
  padding-top: 30px;
}

.add-btn {
  background: #10b981;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

.add-btn:hover {
  background: #059669;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
}

.error-alert {
  background: #fee;
  border: 1px solid #fcc;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  color: #c33;
}

.error-alert h3 {
  margin: 0 0 0.5rem 0;
  color: #c33;
}

.retry-btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}

.retry-btn:hover {
  background: #2980b9;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-card {
  padding: 8px 16px;
  background: #f3f4f6;
  border-radius: 8px;
  font-weight: 600;
  width: fit-content;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.table-header h3 {
  margin: 0;
}

.search-input {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input input {
  padding: 0.5rem 2.5rem 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.9rem;
  min-width: 250px;
}

.search-icon {
  position: absolute;
  right: 0.75rem;
  color: #666;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.table-header-cell {
  background: #f8f9fa;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #2c3e50;
  border-bottom: 2px solid #e9ecef;
}

.table-row {
  border-bottom: 1px solid #e9ecef;
}

.table-row:hover {
  background: #f8f9fa;
}

.table-row td {
  padding: 1rem;
  color: #495057;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.edit-btn, .delete-btn {
  border: none;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.edit-btn {
  background: #fbbf24;
  color: white;
}

.edit-btn:hover {
  background: #f59e0b;
}

.delete-btn {
  background: #ef4444;
  color: white;
}

.delete-btn:hover {
  background: #dc2626;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #6c757d;
}

/* Модальное окно */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
}

.modal h3 {
  margin: 0 0 1.5rem 0;
  color: #1f2937;
  text-align: center;
}

.modal p {
  margin: 0 0 2rem 0;
  color: #6b7280;
  text-align: center;
}

.source-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: #374151;
}

.form-group input {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
}

.form-group input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-group input:disabled {
  background-color: #f3f4f6;
  cursor: not-allowed;
}

.error-message {
  color: #ef4444;
  font-size: 0.9rem;
  margin-top: -1rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.btn-primary {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.btn-primary:hover:not(:disabled) {
  background: #2563eb;
}

.btn-primary:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.btn-danger {
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  margin-right: 10px;
}

.btn-danger:hover {
  background: #dc2626;
}

.btn-cancel {
  background: #6b7280;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}

.btn-cancel:hover {
  background: #4b5563;
}

.btn-cancel:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}
</style>