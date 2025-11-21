<template>
  <div class="categories-page">
    <div class="page-header">
      <h1>Категории товаров</h1>
      <button @click="isModalOpen = true" class="add-btn">+ Добавить</button>
    </div>

    <div class="categories-list">
      <div v-for="category in categories" :key="category.id" class="category-item">
        <div class="category-info">
          <span class="category-name">{{ category.name }}</span>
          <span class="slug">({{ category.slug }})</span>
          <div v-if="category.imageUrl" class="category-image">
            <img :src="category.imageUrl" :alt="category.name" />
          </div>
        </div>
        <div class="category-actions">
          <button @click="editCategory(category)" class="edit-btn">Редактировать</button>
          <button @click="deleteCategory(category.id)" class="delete-btn">Удалить</button>
        </div>
      </div>
    </div>

    <!-- Модальное окно -->
    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>{{ isEditing ? 'Редактировать' : 'Новая' }} категория</h3>
          <button @click="closeModal">×</button>
        </div>

        <form @submit.prevent="saveCategory" class="modal-form" enctype="multipart/form-data">
          <div class="form-group">
            <label>Название *</label>
            <input v-model="form.name" required @input="generateSlug">
          </div>

          <div class="form-group">
            <label>ЧПУ для категории *</label>
            <input v-model="form.slug" placeholder="electronics" required>
          </div>

          <div class="form-group">
            <label>Изображение категории</label>
            <input 
              type="file" 
              accept="image/*" 
              @change="handleImageUpload"
              ref="fileInput"
            >
            <div v-if="imagePreview" class="image-preview">
              <img :src="imagePreview" alt="Preview" />
              <button type="button" @click="removeImage" class="remove-image-btn">×</button>
            </div>
            <div v-else-if="form.imageUrl" class="image-preview">
              <img :src="form.imageUrl" alt="Current image" />
              <button type="button" @click="removeExistingImage" class="remove-image-btn">×</button>
            </div>
          </div>

          <div class="form-group">
            <label>SEO Title</label>
            <input v-model="form.seoTitle" maxlength="255">
          </div>

          <div class="form-group">
            <label>SEO Description</label>
            <textarea v-model="form.seoDescription" rows="3" maxlength="500"></textarea>
          </div>

          <div class="form-group">
            <label>Описание категории</label>
            <textarea v-model="form.description" rows="4"></textarea>
          </div>

          <div class="form-group">
            <label>Родительская категория</label>
            <select v-model="form.parentId">
              <option :value="null">Без родителя</option>
              <option 
                v-for="cat in categories.filter(c => c.id !== form.id)" 
                :key="cat.id" 
                :value="cat.id"
              >
                {{ cat.name }}
              </option>
            </select>
          </div>

          <div class="form-actions">
            <button type="submit" :disabled="isLoading">
              {{ isLoading ? 'Загрузка...' : isEditing ? 'Обновить' : 'Сохранить' }}
            </button>
            <button type="button" @click="closeModal">Отмена</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'dashboard' })

const isModalOpen = ref(false)
const isEditing = ref(false)
const isLoading = ref(false)
const categories = ref([])
const imagePreview = ref(null)
const fileInput = ref(null)
const uploadedFile = ref(null)

const form = reactive({
  id: null,
  name: '',
  slug: '',
  imageUrl: '',
  seoTitle: '',
  seoDescription: '',
  description: '',
  parentId: null
})

// Загрузка категорий
const loadCategories = async () => {
  try {
    const response = await $fetch('/api/categories')
    categories.value = response.categories || []
  } catch (error) {
    console.error('Ошибка загрузки категорий:', error)
  }
}

// Загрузка изображения
const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    uploadedFile.value = file
    
    // Создаем preview
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

// Удаление выбранного изображения
const removeImage = () => {
  imagePreview.value = null
  uploadedFile.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// Удаление существующего изображения
const removeExistingImage = () => {
  form.imageUrl = ''
}

// Генерация slug
const generateSlug = () => {
  if (form.name && !form.slug) {
    form.slug = form.name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .trim('-')
  }
}

// Редактирование категории
const editCategory = (category) => {
  Object.assign(form, category)
  isEditing.value = true
  isModalOpen.value = true
  imagePreview.value = null
  uploadedFile.value = null
}

// Удаление категории
const deleteCategory = async (id) => {
  if (confirm('Вы уверены, что хотите удалить эту категорию?')) {
    try {
      await $fetch(`/api/categories/${id}`, {
        method: 'DELETE'
      })
      await loadCategories()
    } catch (error) {
      console.error('Ошибка удаления категории:', error)
    }
  }
}

// Сохранение категории
const saveCategory = async () => {
  isLoading.value = true
  try {
    let imageUrl = form.imageUrl

    // Если есть новое изображение, загружаем его
    if (uploadedFile.value) {
      const formData = new FormData()
      formData.append('image', uploadedFile.value)
      
      const uploadResponse = await $fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      imageUrl = uploadResponse.imageUrl
    }

    // Подготавливаем данные для отправки
    const requestData = { 
      name: form.name,
      slug: form.slug,
      imageUrl: imageUrl, 
      seoTitle: form.seoTitle,
      seoDescription: form.seoDescription,
      description: form.description,
      parentId: form.parentId
    }
    
    const url = isEditing.value ? `/api/categories/${form.id}` : '/api/categories'
    const method = isEditing.value ? 'PUT' : 'POST'

    const response = await $fetch(url, {
      method,
      body: requestData
    })
    
    closeModal()
    await loadCategories()
  } catch (error) {
    console.error('Ошибка сохранения категории:', error)
    alert(error.data?.message || 'Ошибка при сохранении категории')
  } finally {
    isLoading.value = false
  }
}

// Закрытие модалки
const closeModal = () => {
  isModalOpen.value = false
  isEditing.value = false
  imagePreview.value = null
  uploadedFile.value = null
  Object.assign(form, { 
    id: null,
    name: '', 
    slug: '', 
    imageUrl: '', 
    seoTitle: '', 
    seoDescription: '', 
    description: '', 
    parentId: null 
  })
}

// Загружаем при mounted
onMounted(loadCategories)
</script>

<style scoped>
.categories-page { padding: 20px; max-width: 1000px; margin: 0 auto; }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
.add-btn { background: #10b981; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; }

.categories-list { display: flex; flex-direction: column; gap: 15px; }
.category-item { 
  background: white; 
  padding: 20px; 
  border-radius: 8px; 
  border: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.category-info { display: flex; flex-direction: column; gap: 8px; }
.category-name { font-weight: 600; font-size: 16px; }
.slug { color: #6b7280; font-size: 14px; }
.category-image img { width: 60px; height: 60px; object-fit: cover; border-radius: 4px; }
.category-actions { display: flex; gap: 10px; }
.edit-btn, .delete-btn { 
  padding: 8px 12px; 
  border: none; 
  border-radius: 5px; 
  cursor: pointer; 
}
.edit-btn { background: var(--primary); color: white; }
.delete-btn { background: #ef4444; color: white; }

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
}
.modal { 
  background: white; 
  border-radius: 12px; 
  padding: 24px; 
  width: 90%; 
  max-width: 500px; 
  max-height: 90vh;
  overflow-y: auto;
}
.modal-header { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  margin-bottom: 20px; 
  padding-bottom: 15px;
  border-bottom: 1px solid #e5e7eb;
}
.modal-form { display: flex; flex-direction: column; gap: 20px; }
.form-group { display: flex; flex-direction: column; gap: 8px; }
.form-group label { font-weight: 500; color: #374151; }
.form-group input, .form-group select, .form-group textarea { 
  padding: 10px; 
  border: 1px solid #d1d5db; 
  border-radius: 6px; 
  font-size: 14px;
}
.form-group input[type="file"] { padding: 8px; }
.form-group textarea { resize: vertical; min-height: 80px; }

.image-preview { 
  position: relative; 
  margin-top: 10px; 
  display: inline-block;
}
.image-preview img { 
  width: 100px; 
  height: 100px; 
  object-fit: cover; 
  border-radius: 4px; 
  border: 1px solid #e5e7eb;
}
.remove-image-btn {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-actions { 
  display: flex; 
  gap: 12px; 
  justify-content: flex-end; 
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
}
.form-actions button { 
  padding: 10px 20px; 
  border: none; 
  border-radius: 6px; 
  cursor: pointer; 
  font-weight: 500;
}
.form-actions button[type="submit"] { 
  background: #3b82f6; 
  color: white; 
}
.form-actions button[type="submit"]:disabled { 
  background: #9ca3af; 
  cursor: not-allowed;
}
.form-actions button[type="button"] { 
  background: #6b7280; 
  color: white; 
}
</style>