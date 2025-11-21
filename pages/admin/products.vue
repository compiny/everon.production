<template>
    <div class="products-page">
        <div class="page-header">
            <h1>Товары</h1>
            <button @click="isModalOpen = true" class="add-btn">+ Добавить</button>
        </div>

        <div class="products-list">
            <div v-for="product in products" :key="product.id" class="product-item">
                <div class="product-info">
                    <span class="product-name">{{ product.name }}</span>
                    <span class="slug">({{ product.slug }})</span>
                    <span class="price">{{ product.price }} ₽</span>
                    <span class="category-name">Категория: {{ getCategoryName(product.categoryId) }}</span>
                    
                    <!-- Отображение описания с Markdown -->
                    <div v-if="product.description" class="product-description">
                        <div v-html="renderMarkdown(product.description)"></div>
                    </div>

                    <div>Главное фото:</div>
                    <div v-if="product.mainImage" class="product-image">
                        <img :src="product.mainImage" :alt="product.name" />
                    </div>
                    <div v-if="product.gallery" class="gallery-images">
                        <div>Галерея:</div>
                        <img v-for="(img, index) in parseGallery(product.gallery)" :key="index" :src="img"
                            alt="Gallery image" class="gallery-img" />
                    </div>
                </div>

                <div class="product-actions">
                    <button @click="editProduct(product)" class="edit-btn">Редактировать</button>
                    <button @click="deleteProduct(product.id)" class="delete-btn">Удалить</button>
                </div>
            </div>
        </div>

        <!-- Модальное окно -->
        <div v-if="isModalOpen" class="modal-overlay">
            <div class="modal">
                <div class="modal-header">
                    <h3>{{ isEditing ? 'Редактировать' : 'Новый' }} товар</h3>
                    <button @click="closeModal">×</button>
                </div>

                <form @submit.prevent="saveProduct" class="modal-form" enctype="multipart/form-data">
                    <div class="form-group">
                        <label>Название *</label>
                        <input v-model="form.name" required @input="generateSlug">
                    </div>

                    <div class="form-group">
                        <label>ЧПУ для товара *</label>
                        <input v-model="form.slug" placeholder="product-slug" required>
                    </div>

                    <div class="form-group">
                        <label>Цена (в ₽) *</label>
                        <input type="number" v-model.number="form.price" required min="0">
                    </div>

                    <div class="form-group">
                        <label>Главное изображение</label>
                        <input type="file" accept="image/*" @change="handleMainImageUpload" ref="mainImageInput">
                        <div v-if="mainImagePreview" class="image-preview">
                            <img :src="mainImagePreview" alt="Preview" />
                            <button type="button" @click="removeMainImage" class="remove-image-btn">×</button>
                        </div>
                        <div v-else-if="form.mainImage" class="image-preview">
                            <img :src="form.mainImage" alt="Current image" />
                            <button type="button" @click="removeExistingMainImage" class="remove-image-btn">×</button>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Галерея</label>
                        <input type="file" multiple accept="image/*" @change="handleGalleryUpload" ref="galleryInput">

                        <div v-if="existingGallery.length > 0" class="existing-gallery">
                            <h4>Существующие изображения:</h4>
                            <div class="gallery-preview">
                                <div v-for="(img, index) in existingGallery" :key="'existing-' + index"
                                    class="image-preview">
                                    <img :src="img" alt="Existing gallery image" />
                                    <button type="button" @click="removeExistingGalleryImage(index)"
                                        class="remove-image-btn">×</button>
                                </div>
                            </div>
                        </div>

                        <div v-if="galleryPreviews.length > 0" class="new-gallery">
                            <h4>Новые изображения:</h4>
                            <div class="gallery-preview">
                                <div v-for="(img, index) in galleryPreviews" :key="'new-' + index"
                                    class="image-preview">
                                    <img :src="img" alt="Gallery image preview" />
                                    <button type="button" @click="removeGalleryImage(index)"
                                        class="remove-image-btn">×</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ProductAttributes 
                        ref="productAttributesRef" 
                        :initial-attributes="form.attributes" 
                        @change="handleCharacteristicsUpdate" 
                    />

                    <div class="form-group">
                        <label>SEO Title</label>
                        <input v-model="form.seoTitle" maxlength="255">
                    </div>

                    <div class="form-group">
                        <label>SEO Description</label>
                        <textarea v-model="form.seoDescription" rows="3" maxlength="500"></textarea>
                    </div>

                    <!-- Простой textarea для Markdown вместо редактора -->
                    <div class="form-group">
                        <label>Описание товара (Markdown)</label>
                        <textarea 
                            v-model="form.description" 
                            rows="8" 
                            placeholder="Введите описание товара с использованием Markdown..."
                            class="markdown-textarea"
                        ></textarea>
                        <div class="markdown-hint">
                            <small>Поддерживается Markdown: заголовки и параграфы</small>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Категория</label>
                        <select v-model="form.categoryId">
                            <option :value="null">Без категории</option>
                            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
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

import { ref, reactive, onMounted } from 'vue'

const isModalOpen = ref(false)
const isEditing = ref(false)
const isLoading = ref(false)
const products = ref([])
const categories = ref([])
const mainImagePreview = ref(null)
const mainImageInput = ref(null)
const galleryFiles = ref([])
const galleryPreviews = ref([])
const galleryInput = ref(null)
const uploadedMainImageFile = ref(null)

const form = reactive({
    id: null,
    name: '',
    slug: '',
    price: 0,
    mainImage: '',
    gallery: '',
    seoTitle: '',
    seoDescription: '',
    description: '', 
    attributes: [],
    categoryId: null
})


const renderMarkdown = (markdownText) => {
    if (!markdownText) return ''
    
    // Заменяем заголовки
    let html = markdownText
        .replace(/^###### (.*$)/gim, '<h6>$1</h6>')
        .replace(/^##### (.*$)/gim, '<h5>$1</h5>')
        .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    
    const lines = html.split('\n')
    let result = ''
    let inParagraph = false
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim()

        if (!line) {
            if (inParagraph) {
                result += '</p>'
                inParagraph = false
            }
            continue
        }
        

        if (line.startsWith('<h')) {
            if (inParagraph) {
                result += '</p>'
                inParagraph = false
            }
            result += line
        } 

        else {
            if (!inParagraph) {
                result += '<p>'
                inParagraph = true
            } else {
                result += ' '
            }
            result += line
        }
    }
    if (inParagraph) {
        result += '</p>'
    }
    
    return result
}

const parseGallery = (galleryStr) => {
    try {
        const arr = JSON.parse(galleryStr)
        if (Array.isArray(arr)) return arr
        return []
    } catch {
        return []
    }
}

const parseAttributes = (attributesStr) => {
    try {
        if (!attributesStr) return []
        const arr = JSON.parse(attributesStr)
        if (Array.isArray(arr)) return arr
        return []
    } catch {
        console.error('Ошибка парсинга атрибутов:', attributesStr)
        return []
    }
}

const loadProducts = async () => {
    try {
        const response = await $fetch('/api/products')
        products.value = response.products || []
    } catch (error) {
        console.error('Ошибка загрузки товаров:', error)
    }
}

const loadCategories = async () => {
    try {
        const response = await $fetch('/api/categories')
        categories.value = response.categories || []
    } catch (error) {
        console.error('Ошибка загрузки категорий:', error)
    }
}

const getCategoryName = (categoryId) => {
    const cat = categories.value.find(c => c.id === categoryId)
    return cat ? cat.name : 'Без категории'
}

const handleMainImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
        uploadedMainImageFile.value = file
        const reader = new FileReader()
        reader.onload = (e) => {
            mainImagePreview.value = e.target.result
        }
        reader.readAsDataURL(file)
    }
}

const removeMainImage = () => {
    mainImagePreview.value = null
    uploadedMainImageFile.value = null
    if (mainImageInput.value) {
        mainImageInput.value.value = ''
    }
}

const removeExistingMainImage = () => {
    form.mainImage = ''
}

const handleGalleryUpload = (event) => {
    const files = Array.from(event.target.files)
    galleryFiles.value.push(...files)

    files.forEach(file => {
        const reader = new FileReader()
        reader.onload = e => {
            galleryPreviews.value.push(e.target.result)
        }
        reader.readAsDataURL(file)
    })

    if (galleryInput.value) {
        galleryInput.value.value = ''
    }
}

const removeGalleryImage = (index) => {
    galleryFiles.value.splice(index, 1)
    galleryPreviews.value.splice(index, 1)
}

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

const existingGallery = ref([])
const removedGalleryImages = ref([])

const editProduct = async (product) => {
  Object.assign(form, {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    mainImage: product.mainImage,
    gallery: product.gallery,
    seoTitle: product.seoTitle,
    seoDescription: product.seoDescription,
    description: product.description || '', 
    categoryId: product.categoryId,
    attributes: parseAttributes(product.attributes)
  })

  existingGallery.value = []
  removedGalleryImages.value = []
  galleryFiles.value = []
  galleryPreviews.value = []

  if (product.gallery) {
    let galleryArray = []
    try {
      galleryArray = typeof product.gallery === 'string'
        ? JSON.parse(product.gallery)
        : product.gallery
    } catch (e) {
      console.error('Error parsing gallery:', e)
    }

    if (Array.isArray(galleryArray)) {
      existingGallery.value = galleryArray
    }
  }

  isEditing.value = true
  isModalOpen.value = true
  mainImagePreview.value = null
  uploadedMainImageFile.value = null
}

const removeExistingGalleryImage = (index) => {
    removedGalleryImages.value.push(existingGallery.value[index])
    existingGallery.value.splice(index, 1)
}

const handleCharacteristicsUpdate = (characteristics) => {
  form.attributes = characteristics
}

const deleteProduct = async (id) => {
    if (confirm('Вы уверены, что хотите удалить этот товар?')) {
        try {
            await $fetch(`/api/products/${id}`, {
                method: 'DELETE'
            })
            await loadProducts()
        } catch (error) {
            console.error('Ошибка удаления товара:', error)
        }
    }
}

const productAttributesRef = ref(null)

const saveProduct = async () => {
  isLoading.value = true
  try {
    const formData = new FormData()
    if (form.id) formData.append('id', form.id)
    formData.append('name', form.name)
    formData.append('slug', form.slug)
    formData.append('price', String(form.price))
    formData.append('seoTitle', form.seoTitle || '')
    formData.append('seoDescription', form.seoDescription || '')
    formData.append('description', form.description || '') // Markdown текст
    formData.append('existingGallery', JSON.stringify(existingGallery.value))

    if (productAttributesRef.value) {
      const characteristics = productAttributesRef.value.getCharacteristicsForSave()
      formData.append('attributes', JSON.stringify(characteristics)) 
    } else {
      formData.append('attributes', JSON.stringify([])) 
    }

    if (form.categoryId !== null) {
      formData.append('categoryId', String(form.categoryId))
    }
    if (uploadedMainImageFile.value) {
      formData.append('mainImage', uploadedMainImageFile.value)
    }

    galleryFiles.value.forEach(file => {
      formData.append('galleryFiles', file)
    })

    const url = isEditing.value ? `/api/products/${form.id}` : '/api/products'
    const method = isEditing.value ? 'PUT' : 'POST'

    const response = await $fetch(url, {
      method,
      body: formData,
    })

    closeModal()
    await loadProducts()
  } catch (error) {
    console.error('Ошибка сохранения товара:', error)
    alert(error.data?.message || 'Ошибка при сохранении товара')
  } finally {
    isLoading.value = false
  }
}

const closeModal = () => {
    isModalOpen.value = false
    isEditing.value = false
    mainImagePreview.value = null
    uploadedMainImageFile.value = null
    
    Object.assign(form, {
        id: null,
        name: '',
        slug: '',
        price: 0,
        mainImage: '',
        gallery: '',
        seoTitle: '',
        seoDescription: '',
        description: '', // Сбрасываем Markdown
        attributes: [],
        categoryId: null
    })

    if (productAttributesRef.value) {
        productAttributesRef.value.resetCharacteristics()
    }
}

onMounted(() => {
    loadProducts()
    loadCategories()
})
</script>

<style scoped>
.markdown-textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: monospace;
    resize: vertical;
}

.markdown-hint {
    margin-top: 5px;
    color: #666;
}
</style>

<style scoped>
.products-page {
    padding: 20px;
    max-width: 1000px;
    margin: 0 auto;
}

.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
}

.add-btn {
    background: #10b981;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
}

.products-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.product-item {
    background: white;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.product-info {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.gallery-images {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 8px;
}

.product-image img,
.gallery-img {
    width: 60px;
    height: 60px;
    object-fit: contain;
    border-radius: 4px;
    border: 1px solid #e5e7eb;
}

.product-name {
    font-weight: 600;
    font-size: 16px;
}

.slug {
    color: #6b7280;
    font-size: 14px;
}

.price {
    font-weight: 500;
    color: #059669;
}

.product-actions {
    display: flex;
    gap: 10px;
}

.edit-btn,
.delete-btn {
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.edit-btn {
    background: var(--primary);
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
    background: rgba(0, 0, 0, 0.5);
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

.modal-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.form-group label {
    font-weight: 500;
    color: #374151;
}

.form-group input,
.form-group select,
.form-group textarea {
    padding: 10px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 14px;
}

.form-group input[type="file"] {
    padding: 8px;
}

.form-group textarea {
    resize: vertical;
    min-height: 80px;
}

.image-preview {
    position: relative;
    margin: 10px 10px;
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
