<template>
    <div class="products_list">
        <div v-if="loading" class="loading">Загрузка товаров...</div>
        <div v-else-if="products.length === 0" class="no-products">
            Товары не найдены
        </div>

        <div v-else v-for="item in products" :key="item.id" class="card-wrapper">
            <div class="card-img">
                <Actions />
                <img :src="getImageSrc(item.mainImage)" :alt="item.name" class="product"
                    @error="handleImageError" />
            </div>
            <nuxt-link :to="`/catalog/${slug}/${item.slug}`" class="card_itle">
                {{ item.name }}
            </nuxt-link>
            <div class="price">{{ item.price }} <span>руб.</span></div>
            <BuyBtn />
            <div class="in_stock">В наличии</div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const route = useRoute()
const slug = ref('')

const props = defineProps({
    searchQuery: { type: String, default: '' },
    initialLimit: { type: Number, default: 20 } 
})

const products = ref([])
const loading = ref(false)
const error = ref(null)
const hasMore = ref(false)
const currentLimit = ref(props.initialLimit)

const fetchProducts = async () => {
    // Проверяем, что slug доступен
    if (!slug.value) {
        console.log('Slug not available yet')
        return
    }
    
    loading.value = true
    error.value = null
    try {
        const { data } = await useFetch('/api/products', {
            query: { 
                search: props.searchQuery, 
                limit: currentLimit.value,
                category: slug.value 
            }
        })
        if (data.value) {
            products.value = data.value.products
            hasMore.value = data.value.hasMore
        }
    } catch (err) {
        error.value = 'Ошибка при загрузке товаров'
        console.error('Error loading products:', err)
    } finally {
        loading.value = false
    }
}

const getImageSrc = (image) => {
    if (!image) return '/images/placeholder.jpg'
    return image.startsWith('/uploads/products/') ? image : `/uploads/products/${image}`
}

const handleImageError = (event) => {
    event.target.src = '/images/placeholder.jpg'
}

// Следим за изменением route
watch(() => route.params.slug, (newSlug) => {
    if (newSlug) {
        slug.value = newSlug
        currentLimit.value = props.initialLimit
        fetchProducts()
    }
}, { immediate: true })

// Следим за изменением поискового запроса
watch(() => props.searchQuery, () => {
    currentLimit.value = props.initialLimit
    fetchProducts()
})

// Инициализация при монтировании
onMounted(() => {
    if (route.params.slug) {
        slug.value = route.params.slug
        fetchProducts()
    }
})
</script>

<style scoped>
.products_list {
    height: fit-content;
    display: flex;
    flex-wrap: wrap;
    gap: 19px;
    margin-left: 20px;
    margin-bottom: 60px;
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
    width: 250px;
    background: #fff;
    border-radius: 10px;
}

.card-img img {
    height: 250px;
    width: 100%;
    object-fit: contain;
    padding: 20px 0;
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

@media (max-width: 640px) {
    h2 {
        display: none;
    }

    .bg-white {
        background: #fff;
    }

    .products_list {
        justify-content: center;
        padding-top: 40px;
    }
}
</style>