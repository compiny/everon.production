<template>
  <div class="catalog-page">
    <div class="container">
      <h2>Каталог</h2>
      
      <div v-if="pending" class="loading">Загрузка категорий...</div>
      <div v-else-if="error" class="error">Ошибка загрузки категорий</div>
      <div v-else>
        <ul class="categories">
          <li v-for="category in categories" :key="category.id">
            <NuxtLink :to="`/catalog/${category.slug}`">
              <img 
                :src="category.imageUrl" 
                :alt="category.name"
                @error="handleImageError"
              />
              <div>{{ category.name }}</div>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
</div>
<Proposal />
</template>
<script setup>
const { data, pending, error } = await useFetch('/api/categories')
const categories = computed(() => data.value?.categories || [])

const handleImageError = (event) => {
  event.target.src = '/images/placeholder.jpg'
}
</script>
<style scoped>
.catalog-page {
    padding: 40px 0 49px;
    background: var(--bg);
}

h2 {
    margin-bottom: 40px;
}

.categories {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

ul.categories li:not(:nth-child(3)):not(:nth-child(4)) a div {
    padding-top: 8px;
}

li {
    padding: 28px 27px 18px;
    background: #fff;
    border-radius: 10px;

}
li a {
    display: flex;
    flex-direction: column;
    align-items: center;
}
li a div{
    color: var(--primary);
    font-weight: 700;
    width: 80%;
    text-align: center;
}

img {
    padding: 0;
    margin-bottom: 18px;
    width: 317px;
    height: 317px;
    border-radius: 10px;
    object-fit: cover;
}

.banner {
    padding-bottom: 32px;
}

@media (max-width: 1280px) {
    .categories {
        justify-content: center;
    }
}

@media (max-width: 640px) {
    .banner {
        background: var(--bg);
        padding-top: 28px;
        margin-top: -10px;
    }
}

@media (max-width: 380px) {
    .catalog-page {
        padding-top: 0;
        background: #fff;
    }

    img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        object-position: bottom;
        margin-bottom: 10px;
    }

    li:first-child a img {
        object-position: 0 -16px;
    }

    li {
        align-items: flex-start;
    }

    li {
        padding: 0;
        width: 100%;
    }

    li a {
        align-items: flex-start;
    }

    li a div {
        text-align: left;
    }
    ul.categories li:not(:nth-child(3)):not(:nth-child(4)) a div{
        padding-top: 0;
    }
}
</style>