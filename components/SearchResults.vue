<template>
    <div class="search-results-modal">
        <div class="modal-overlay" @click="$emit('close')"></div>
        <div class="modal-content">
            <button class="close-btn" @click="$emit('close')">×</button>
            
            <h2>Результаты поиска: "{{ searchQuery }}"</h2>
            
            <!-- Категории -->
            <div v-if="results.categories.length > 0" class="results-section">
                <h3>Категории</h3>
                <div class="results-grid">
                    <div 
                        v-for="category in results.categories" 
                        :key="'category-' + category.id"
                        class="result-item category-item"
                        @click="$emit('navigate', `/catalog/${category.slug}`)"
                    >
                        <div class="result-icon">📁</div>
                        <div class="result-info">
                            <div class="result-title">{{ category.name }}</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Товары -->
            <div v-if="results.products.length > 0" class="results-section">
                <h3>Товары</h3>
                <div class="results-grid">
                    <div 
                        v-for="product in results.products" 
                        :key="'product-' + product.id"
                        class="result-item product-item"
                        @click="$emit('navigate', `/catalog/${product.categorySlug || 'products'}/${product.slug}`)"
                    >
                        <img 
                            :src="getProductImage(product.mainImage)" 
                            :alt="product.name"
                            class="product-image"
                        />
                        <div class="result-info">
                            <div class="result-title">{{ product.name }}</div>
                            <div class="product-price">{{ product.price }} руб.</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div v-if="results.categories.length === 0 && results.products.length === 0" class="no-results">
                Ничего не найдено
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    searchQuery: String,
    results: Object
})

const emit = defineEmits(['close', 'navigate'])

const getProductImage = (image) => {
    if (!image) return '/images/placeholder.jpg'
    return image.startsWith('/uploads/') || image.startsWith('http') 
        ? image 
        : `/uploads/products/${image}`
}
</script>

<style scoped>
.search-results-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
}

.modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
}

.modal-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 90%;
    max-height: 90%;
    overflow-y: auto;
    width: 600px;
}

.close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
}

.results-section {
    margin-bottom: 20px;
}

.results-section h3 {
    margin-bottom: 10px;
    color: #333;
}

.results-grid {
    display: grid;
    gap: 10px;
}

.result-item {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
}

.result-item:hover {
    background-color: #f5f5f5;
}

.result-icon {
    margin-right: 10px;
    font-size: 20px;
}

.product-image {
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin-right: 10px;
    border-radius: 4px;
}

.result-info {
    flex: 1;
}

.result-title {
    font-weight: 500;
    margin-bottom: 5px;
}

.product-price {
    color: #2c5aa0;
    font-weight: bold;
}

.no-results {
    text-align: center;
    padding: 40px;
    color: #666;
}
</style>