<template>
    <div class="actions">
        <div>
            <img src="/public/images/heart.svg" alt="" class="heart">
            <img src="/public/images/comparison.svg" alt="">
        </div>
        <div class="stars">
            <img src="/public/images/star-blue.svg" v-for="(item, index) in 4" :key="index" alt="">
            <img src="/public/images/star-grey.svg" alt="">
        </div>
    </div>
</template>
<style scoped>
.actions {
  display: flex;
  justify-content: space-between;
  padding: 17px 16px 0;
  align-items: center;
}

.heart {
  margin-right: 10px;
}

.stars {
  display: flex;
  gap: 2px;
}

.stars img {
  width: 20px;
}

img {
    border-radius: 0;
}
</style>