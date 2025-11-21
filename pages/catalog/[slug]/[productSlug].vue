<template>
    <div class="container" v-if="product">
        <h2>{{ product.name }}</h2>
        <div class="flex content">
            <div class="content_img">
                <div class="discount">40%</div>
                <img :src="product.mainImage || '/public/images/product.png'" class="product" :alt="product.name">
            </div>
            <div class="slider">
                <Slider :images="productImages" />
            </div>
            <div class="description">
                <div class="flex between">
                    <p>Код товара: {{ product.id }}</p>
                    <Actions />
                </div>
                <h6>Характеристики</h6>
                <div v-if="product.attributes && product.attributes.length" class="properties">
                    <div v-for="(attr, index) in product.attributes" :key="index" class="property-item">
                        <span class="property-label">{{ attr.name }} —</span>
                        <span class="property-value">{{ attr.value }}</span>
                    </div>
                </div>
                <div v-else class="properties">
                    <p>Характеристики отсутствуют</p>
                </div>
                <div class="in_stock">
                    В наличии
                </div>
                <div class="price">{{ formattedPrice }} <span>руб.</span></div>
                <div class="old-price">{{ formattedOldPrice }} руб.</div>
                <div class="flex between">
                    <BuyBtn 
                    :product="product" 
                    @success="onOrderSuccess" 
                    />
                    <Counter v-model="quantity" />
                </div>
            </div>
        </div>
        
        <h3>Характеристики</h3>
        <table class="striped-table" v-if="product.attributes && product.attributes.length">
            <tbody>
                <tr v-for="(attr, index) in product.attributes" :key="index">
                    <td>{{ attr.name }}</td>
                    <td class="t-value">{{ attr.value }}</td>
                </tr>
            </tbody>
        </table>
        <table class="striped-table" v-else>
            <tbody>
                <tr>
                    <td colspan="2">Характеристики отсутствуют</td>
                </tr>
            </tbody>
        </table>
        
        <h3>Описание</h3>
        <div v-if="product.description" v-html="product.description" class="product-description"></div>
        <div v-else>
            <p>Описание товара отсутствует.</p>
        </div>
    </div>
    <div v-else-if="loading" class="container">
        <p>Загрузка товара...</p>
    </div>
    <div v-else class="container">
        <p>Товар не найден</p>
    </div>
    <Proposal v-if="product" />
</template>

<script setup>
const route = useRoute()
const product = ref(null)
const loading = ref(true)
const error = ref(null)

const quantity = ref(1)
const productSlug = route.params.productSlug

// Загрузка данных товара
const { data: productData, pending } = await useFetch(`/api/products/by-slug/${productSlug}`)

watchEffect(() => {
    if (productData.value) {
        product.value = productData.value
        loading.value = pending.value
    }
})

// Форматирование цены
const formattedPrice = computed(() => {
    if (!product.value) return '0'
    return new Intl.NumberFormat('ru-RU').format(product.value.price)
})

const formattedOldPrice = computed(() => {
    if (!product.value) return '0'
    const oldPrice = Math.round(product.value.price * 1.4) // +40% для старой цены
    return new Intl.NumberFormat('ru-RU').format(oldPrice)
})

// Обработка галереи изображений
const productImages = computed(() => {
    if (!product.value) return []
    
    let gallery = []
    
    // Если есть главное изображение
    if (product.value.mainImage) {
        gallery.push({
            src: product.value.mainImage,
            alt: product.value.name,
            caption: 'Основное изображение'
        })
    }
    
    // Если есть галерея изображений
    if (product.value.gallery) {
        try {
            const galleryArray = typeof product.value.gallery === 'string' 
                ? JSON.parse(product.value.gallery) 
                : product.value.gallery
            
            galleryArray.forEach((img, index) => {
                if (typeof img === 'string') {
                    gallery.push({
                        src: img,
                        alt: `${product.value.name} - изображение ${index + 1}`,
                        caption: `Изображение ${index + 1}`
                    })
                } else if (img.src) {
                    gallery.push({
                        src: img.src,
                        alt: img.alt || `${product.value.name} - изображение ${index + 1}`,
                        caption: img.caption || `Изображение ${index + 1}`
                    })
                }
            })
        } catch (e) {
            console.error('Error parsing gallery:', e)
        }
    }
    
    // Если нет изображений, используем заглушки
    if (gallery.length === 0) {
        gallery = [
            {
                src: '/images/product1.png',
                alt: product.value.name,
                caption: 'Основное изображение'
            },
            {
                src: '/images/product1.2.png',
                alt: `${product.value.name} - боковой вид`,
                caption: 'Боковой вид'
            }
        ]
    }
    
    return gallery
})

useSeoMeta({
    title: product.value?.seoTitle || product.value?.name,
    description: product.value?.seoDescription || `Купить ${product.value?.name} по выгодной цене`
})
</script>

<style scoped>
</style>

<style scoped>

.container {
    margin-bottom: 60px;
}

.content {
    justify-content: space-between;
    margin: 40px 0;
}

.content_img {
    width: 50%;
    height: 520px;
    border: 1px solid #DCE0ED;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    position: relative;
}

.discount {
    width: 62px;
    height: 95px;
    padding: 10px 0 0;
    line-height: 33px;
    text-align: center;
    background: url(/public/images/discount.svg) no-repeat center;
    position: absolute;
    top: 0;
    right: 20px;
    color: #fff;
    font-size: 32px;
    font-weight: 600;
    word-break: break-word;

}

.content .description {
    width: 472px;
    justify-content: space-between;
}

.content h6 {
    font-size: 16px;
    margin: 17px 0 17px;
}

.actions {
    flex-direction: row-reverse;
    padding: 0;
    width: 200px;
}

.property-item {
    margin-bottom: 7px;
}

p,
span {
    font-size: 14px;
}

span:nth-child(2) {
    color: #515A85;
    margin-left: 3px;
}

.in_stock {
    margin: 44px 0 0;
}

.price {
    margin-top: 59px;
    line-height: 39px;
    font-size: 64px;
}

.price span {
    font-size: 24px;
}

.old-price {
    text-decoration: line-through;
    font-size: 24px;
    margin-bottom: 45px;
}


:deep(.buy-btn){
    width: 226px;
    height: 50px;
    margin: 0;
    background:url(/public/images/cart.svg)60px center no-repeat, var(--secondary);
}

h3 {
    font-weight: bold;
    margin-bottom: 40px;
}

.striped-table {
    width: 100%;
    margin: 0 0 40px;
    border-collapse: collapse;
}

.striped-table td {
    padding: 10px 19px;
}

.striped-table tbody tr:nth-child(odd) {
    background-color: var(--bg-dark);
}

.t-value {
    color: #515A85;
}

h6,
.description,
ul li {
    font-size: 20px;
}

.description {
    margin: 5px 0 20px;

}

ul {
    list-style: disc;
}

ul li::marker {
    color: var(--primary);
}

ul li:first-child {
    margin-top: 39px;
}

ul li {
    margin: 0 0 25px 20px;
}
.product-description {
    line-height: 1.6;
    font-size: 20px;
    color: #333;
}
.product-description ::v-deep(h3,h4) {
    color: #333;
    font-weight: bold;
    font-size: 20px;
    text-transform: none;
}
 ::v-deep(p) {
    margin-bottom: 30px;
}

@media (max-width:640px) {
    .content {
        flex-direction: column;
    }
    .content_img, .content .description {
        width: 100%;
    }
    tbody tr {
        display: flex;
        flex-direction: column;
        font-size: 16px;
    }
    .between {
        flex-direction: column-reverse;
    }
    .striped-table td {
        padding: 0 10px;
    }
}
@media (max-width: 380px) {
    .product {
        width: 100%;
    }
}
</style>

<style>
.between {
    justify-content: space-between;
}
</style>
