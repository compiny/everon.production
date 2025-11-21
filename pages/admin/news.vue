<template>
  <div class="admin-news">
    <div class="page-header">
      <h1>Управление новостями</h1>
      <button @click="showCreateForm = true" class="add-btn">+ Добавить</button>
    </div>

    <div class="news-list">
      <div v-for="item in news" :key="item.id" class="news-item">
        <div class="news-info">
          <h3>{{ item.title }}</h3>
          <p class="news-date">{{ formatDate(item.date) }}</p>
          <p class="news-description" v-if="item.description">
            {{ truncateText(item.description, 100) }}
          </p>
          <p class="created-at">Создано: {{ formatDateTime(item.createdAt) }}</p>
        </div>
        <div class="news-actions">
          <button @click="editNews(item)" class="edit-btn">Редактировать</button>
          <button @click="deleteNews(item.id)" class="delete-btn">Удалить</button>
        </div>
      </div>
    </div>

    <!-- Модальное окно для создания/редактирования -->
    <div v-if="showCreateForm || editingNews" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>{{ editingNews ? 'Редактировать' : 'Создать' }} новость</h3>
          <button @click="closeModal">×</button>
        </div>

        <form @submit.prevent="saveNews" class="modal-form">
          <div class="form-group">
            <label>Заголовок *</label>
            <input v-model="form.title" required>
          </div>

          <div class="form-group">
            <label>Дата новости *</label>
            <input type="date" v-model="form.date" required>
          </div>

          <div class="form-group">
            <label>Описание</label>
            <textarea v-model="form.description" rows="6" placeholder="Текст новости..."></textarea>
          </div>

          <div class="form-actions">
            <button type="submit" :disabled="isLoading">
              {{ isLoading ? 'Сохранение...' : editingNews ? 'Обновить' : 'Создать' }}
            </button>
            <button type="button" @click="closeModal">Отмена</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard',
})

const news = ref([])
const showCreateForm = ref(false)
const editingNews = ref(null)
const isLoading = ref(false)

const form = reactive({
  title: '',
  date: '',
  description: ''
})

// Загрузка новостей
const loadNews = async () => {
  try {
    const data = await $fetch('/api/news')
    news.value = data?.news || []
  } catch (error) {
    console.error('Ошибка загрузки новостей:', error)
  }
}

// Создание новости
const createNews = async () => {
  try {
    await $fetch('/api/news', {
      method: 'POST',
      body: form
    })
    await loadNews()
    closeModal()
  } catch (error) {
    console.error('Ошибка создания новости:', error)
    alert('Ошибка при создании новости')
  }
}

// Обновление новости
const updateNews = async () => {
  try {
    await $fetch(`/api/news/${editingNews.value.id}`, {
      method: 'PUT',
      body: form
    })
    await loadNews()
    closeModal()
  } catch (error) {
    console.error('Ошибка обновления новости:', error)
    alert('Ошибка при обновлении новости')
  }
}

// Удаление новости
const deleteNews = async (id) => {
  if (confirm('Вы уверены, что хотите удалить эту новость?')) {
    try {
      await $fetch(`/api/news/${id}`, {
        method: 'DELETE'
      })
      await loadNews()
    } catch (error) {
      console.error('Ошибка удаления новости:', error)
      alert('Ошибка при удалении новости')
    }
  }
}

// Редактирование новости
const editNews = (item) => {
  editingNews.value = item
  Object.assign(form, {
    title: item.title,
    date: formatDateForInput(item.date),
    description: item.description || ''
  })
}

// Сохранение новости
const saveNews = async () => {
  isLoading.value = true
  try {
    if (editingNews.value) {
      await updateNews()
    } else {
      await createNews()
    }
  } finally {
    isLoading.value = false
  }
}

// Закрытие модального окна
const closeModal = () => {
  showCreateForm.value = false
  editingNews.value = null
  Object.assign(form, {
    title: '',
    date: '',
    description: ''
  })
}

// Вспомогательные функции
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ru-RU')
}

const formatDateTime = (dateString) => {
  return new Date(dateString).toLocaleString('ru-RU')
}

const formatDateForInput = (dateString) => {
  if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return dateString
  }
  return new Date(dateString).toISOString().split('T')[0]
}

const truncateText = (text, length) => {
  if (!text) return ''
  return text.length > length ? text.substring(0, length) + '...' : text
}

onMounted(() => {
  loadNews()
})
</script>

<style scoped>
.admin-news {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
}

.page-header h1 {
  margin: 0;
  color: #333;
}

.add-btn {
  background: #10b981;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s;
}

.news-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.news-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  transition: box-shadow 0.2s;
}

.news-info {
  flex: 1;
  margin-right: 20px;
}

.news-info h3 {
  margin: 0 0 8px 0;
  color: #333;
  font-size: 18px;
  font-weight: 600;
}

.news-date {
  color: #007bff;
  font-size: 14px;
  font-weight: 500;
  margin: 0 0 12px 0;
}

.news-description {
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  margin: 0 0 8px 0;
}

.created-at {
  color: #999;
  font-size: 12px;
  margin: 0;
}

.news-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.edit-btn, .delete-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s;
}

.edit-btn {
  background:var(--primary);
  color: white;
}

.delete-btn {
  background: #ef4444;
  color: white;
}

/* Модальное окно */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal {
  background: white;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px 0;
  margin-bottom: 20px;
}

.modal-header h3 {
  margin: 0;
  color: #333;
}

.modal-header button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-header button:hover {
  color: #666;
}

.modal-form {
  padding: 0 20px 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: #333;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.form-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 30px;
}

.form-actions button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s;
}

.form-actions button[type="submit"] {
  background: var(--primary);
  color: white;
}


.form-actions button[type="submit"]:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.form-actions button[type="button"] {
  background: #6c757d;
  color: white;
}

.form-actions button[type="button"]:hover {
  background: #545b62;
}

</style>