<template>
    <div class="search-container">
        <form class="search-form" @submit.prevent="performSearch" ref="searchForm">
            <input 
                class="search-inp" 
                type="text" 
                placeholder="Поиск"
                v-model="searchQuery"
                @input="handleInput"
                @focus="showSuggestions = true"
                @blur="onBlur"
                ref="searchInput"
            >
            <button class="search-btn" type="submit"></button>
            
            <!-- Подсказки -->
            <div v-if="showSuggestions && searchQuery.length >= 2" class="search-suggestions">
                <div v-if="isLoading" class="suggestion-item">
                    Поиск...
                </div>
                <div v-else-if="suggestions.categories.length === 0 && suggestions.products.length === 0" class="suggestion-item">
                    Ничего не найдено
                </div>
                
                <!-- Категории -->
                <div 
                    v-for="category in suggestions.categories" 
                    :key="'category-' + category.id"
                    class="suggestion-item suggestion-category"
                    @mousedown="navigateToSuggestion(category, 'category')"
                >
                    <span class="suggestion-title">📁 {{ category.name }}</span>
                    <span class="suggestion-type">категория</span>
                </div>
                
                <!-- Товары -->
                <div 
                    v-for="product in suggestions.products" 
                    :key="'product-' + product.id"
                    class="suggestion-item suggestion-product"
                    @mousedown="navigateToSuggestion(product, 'product')"
                >
                    <span class="suggestion-title">🛒 {{ product.name }}</span>
                    <span class="suggestion-price">{{ product.price }} руб.</span>
                    <span v-if="product.categorySlug" class="suggestion-category">
                        в {{ getCategoryName(product.categorySlug) }}
                    </span>
                </div>
            </div>
        </form>
        
        <!-- Модальное окно с результатами поиска -->
        <SearchResults 
            v-if="showSearchResults"
            :search-query="searchQuery"
            :results="searchResults"
            @close="closeSearchResults"
            @navigate="navigateToResult"
        />
    </div>
</template>

<script setup>
const searchQuery = ref('')
const showSuggestions = ref(false)
const showSearchResults = ref(false)
const suggestions = ref({
    categories: [],
    products: []
})
const searchResults = ref({
    categories: [],
    products: []
})
const isLoading = ref(false)

let searchTimeout = null

const onBlur = () => {
  setTimeout(() => {
    showSuggestions.value = false
  }, 200)
}

const handleInput = () => {
  if (searchQuery.value.length >= 2) {
    showSuggestions.value = true
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      loadSuggestions()
    }, 300)
  } else {
    showSuggestions.value = false
    suggestions.value = { categories: [], products: [] }
  }
}

// Получить название категории по slug
const getCategoryName = (categorySlug) => {
  const category = suggestions.value.categories.find(cat => cat.slug === categorySlug)
  return category ? category.name : categorySlug
}

// Загрузка подсказок
const loadSuggestions = async () => {
  if (searchQuery.value.length < 2) return
  
  isLoading.value = true
  try {
    const data = await $fetch('/api/search', {
      params: { 
        q: searchQuery.value, 
        limit: 5,
        type: 'both'
      }
    })
    
    suggestions.value = {
      categories: data.categories || [],
      products: data.products || []
    }
    
  } catch (error) {
    console.error('Error loading suggestions:', error)
    suggestions.value = { categories: [], products: [] }
  } finally {
    isLoading.value = false
  }
}

// Полный поиск
const performSearch = async () => {
  if (searchQuery.value.trim()) {
    isLoading.value = true
    try {
      const data = await $fetch('/api/search', {
        params: { 
          q: searchQuery.value, 
          limit: 20,
          type: 'both'
        }
      })
      
      searchResults.value = {
        categories: data.categories || [],
        products: data.products || []
      }
      
      showSearchResults.value = true
      showSuggestions.value = false
      
    } catch (error) {
      console.error('Error performing search:', error)
      searchResults.value = { categories: [], products: [] }
    } finally {
      isLoading.value = false
    }
  }
}

// Навигация по подсказкам
const navigateToSuggestion = (item, type) => {
  showSuggestions.value = false
  searchQuery.value = ''
  
  let url = ''
  if (type === 'category') {
    url = `/catalog/${item.slug}`
  } else if (type === 'product') {
    url = `/catalog/${item.categorySlug || 'products'}/${item.slug}`
  }
  
  navigateTo(url)
}

const closeSearchResults = () => {
  showSearchResults.value = false
  searchQuery.value = ''
}

const navigateToResult = (url) => {
  showSearchResults.value = false
  searchQuery.value = ''
  navigateTo(url)
}

// Функция навигации
const navigateTo = (url) => {
  if (process.client) {
    window.location.href = url
  }
}
</script>

<style scoped>
.search-suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.suggestion-item {
  padding: 10px 15px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: between;
  align-items: center;
}

.suggestion-item:hover {
  background-color: #f5f5f5;
}

.suggestion-title {
  flex: 1;
  font-weight: 500;
}

.suggestion-type {
  color: #666;
  font-size: 0.8em;
  margin-left: 10px;
}

.suggestion-price {
  color: #2c5aa0;
  font-weight: bold;
  margin-left: 10px;
}

.suggestion-category {
  border-left: 3px solid #4CAF50;
}

.suggestion-product {
  border-left: 3px solid #2196F3;
}
</style>