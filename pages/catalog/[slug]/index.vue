<template>
  <div>
    <Banner :title="category?.name" :image="category?.imageUrl" :description="category?.description" />
    <div class="products">
      <div class="container flex">
        <div class="aside">
          <h2>{{ category?.name }}</h2>
          <ProductFilter 
            v-if="availableFilters.length > 0"
            :filters="availableFilters"
            :total-products="totalProducts"
            @filter-change="handleFilterChange"
            @filter-preview="handleFilterPreview"
          />
        </div>
        <div v-if="isLoading" class="loading">Загрузка...</div>
          
        <div class="products_list" v-else>
          <div v-for="product in products" :key="product.id" class="card-wrapper">
            <div class="card-img">
              <Actions />
              <img src="/public/images/product1.png" alt="" class="product" />
            </div>
            <nuxt-link :to="`/catalog/${category.slug}/${product.slug}`" class="card_title">
              {{ product.name }}
            </nuxt-link>
            <div class="price">{{ product.price }} руб.</div>
            <!-- Передаем product в функцию -->
            <BuyBtn 
              :product="product" 
              @success="onOrderSuccess" 
            />
            <div class="in_stock">В наличии</div>
          </div>
          
          <div v-if="products.length === 0" class="no-products">
            Товары не найдены
          </div>
        </div>
      </div>

      <div class="container">
        <Pagination 
          :current-page="currentPage" 
          :total-items="totalProducts" 
          :items-per-page="itemsPerPage"
          @page-change="handlePageChange" 
          class="pagination-wrapper" 
        />
      </div>
    </div>

    <!-- Модальное окно должно быть ВНЕ цикла v-for -->
    <BuyProductModal 
      ref="buyModalRef"
      :product="selectedProduct"
      @close="onModalClose"
      @success="onOrderSuccess"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { slug } = route.params

const products = ref([])
const availableFilters = ref([])
const activeFilters = ref({})
const isLoading = ref(false)
const currentPage = ref(1)
const itemsPerPage = ref(12)
const totalProducts = ref(0)
const buyModalRef = ref()
const selectedProduct = ref(null)
const { data: category } = await useFetch(`/api/categories/by-slug/${slug}`)

// Загрузка доступных фильтров с учетом категории
const loadAvailableFilters = async () => {
  try {
    if (!category.value?.id) return
    
    const response = await $fetch('/api/products/filters-available', {
      query: {
        categoryId: category.value.id
      }
    })
    availableFilters.value = response.filters
  } catch (error) {
    console.error('Error loading filters:', error)
  }
}

// Загрузка товаров
const loadProducts = async (filters = {}) => {
  if (!category.value?.id) return
  
  isLoading.value = true
  try {
    const response = await $fetch('/api/products/filter', {
      method: 'POST',
      body: {
        filters: {
          ...filters,
          categoryId: category.value.id
        },
        page: currentPage.value,
        limit: itemsPerPage.value
      }
    })
    
    products.value = response.products
    totalProducts.value = response.pagination.total
    
    // После загрузки товаров обновляем фильтры
    await loadAvailableFilters()
    
  } catch (error) {
    console.error('Error loading products:', error)
  } finally {
    isLoading.value = false
  }
}

const loadInitialProducts = async () => {
  await loadProducts({})
}

const handleFilterPreview = (previewData) => {
  console.log('Preview data:', previewData)
}

const handleFilterChange = async (newFilters) => {
  activeFilters.value = newFilters
  currentPage.value = 1
  await loadProducts(newFilters)
}

const handlePageChange = async (page) => {
  currentPage.value = page
  await loadProducts(activeFilters.value)
}

const openBuyModal = (product) => {
  selectedProduct.value = product
  console.log('Opening modal for product:', product) // Для отладки
  buyModalRef.value?.showModal()
}

const onModalClose = () => {
  console.log('Modal closed')
}

const onOrderSuccess = (leadId) => {
  console.log('Order success, lead ID:', leadId)
}

// Следим за изменением категории
watch(category, (newCategory) => {
  if (newCategory) {
    loadAvailableFilters()
    loadInitialProducts()
  }
})

onMounted(() => {
  if (category.value) {
    loadAvailableFilters()
    loadInitialProducts()
  }
})
</script>

<style scoped>
.flex {
  display: flex;
  gap: 30px;
}

.aside {
  width: 300px;
  flex-shrink: 0;
}

.search-box {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.products_list {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.loading {
  text-align: center;
  padding: 40px;
  font-size: 18px;
}

.no-products {
  text-align: center;
  padding: 40px;
  color: #666;
}

.products {
  margin-top: 40px;
  padding-top: 33px;
  background: var(--bg);
}

.flex {
  display: flex;
}

.aside {
  width: 278px;
  flex-shrink: 0;
}

.aside h2 {
  font-size: 20px;
  padding-bottom: 38px;
  width: 238px;
}



.card-wrapper {
  width: 278px;
  padding: 14px 14px 23px;
  background: var(--bg-dark);
  border-radius: 10px;
  display: flex;
  height: fit-content;
  flex-direction: column;
  text-align: center;
}

.card-img {
  height: 290px;
  width: 250px;
  background: #fff;
  border-radius: 10px;
}

.product {
  padding: 40px 0;
}

.card-wrapper a {
  color: var(--primary);
  font-weight: bold;
  line-height: 20px;
  padding: 20px 0 10px;
}

.card-wrapper p {
  font-size: 14px;
  color: #515A85;
}

.pagination-wrapper {
  padding-bottom: 60px;
  display: flex;
  justify-content: end;
}

@media (max-width: 640px) {
  h2 {
    display: none;
  }

  .bg-white {
    background: #fff;
  }

  .products_list,
  .pagination-wrapper {
    justify-content: center;
  }

  .flex {
    flex-wrap: wrap;
  }

}
</style>