
<template>
  <div class="container">
    <div class="flex">
      <div class="text-content">
        <h2>{{ title }}</h2>
        <img v-if="image" :src="image" :alt="title" class="none">
        <p v-if="description">{{ description }}</p>
        <div class="btn">
          <QuestionButtonModal />
        </div>
      </div>
      <img v-if="image" :src="image" :alt="title" class="img">
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  title: {
    type: String,
  },
  image: {
    type: String,
    default: ''
  },
  description: {
    type: String,
  }
});

</script>

<style scoped>
.flex {
    position: relative;
    justify-content: space-between;
}
.text-content {
    margin: 83px 20px 0 40px;
    width: 46%;
}
h2 {
    width: 95%;
    margin-bottom: 10px;
}
p {
    font-size: 14px;
    line-height: 36px;
    margin-bottom: 40px;
}
.btn {
    width: 243px;
}
img {
    padding: 0;
    width: 575px;
    height: 372px;
    object-fit: cover;
}
.none{
    display: none
}
.arrows div {
    position: absolute;
    top: 50%;
}
.arrows div:first-of-type {
    left: 0;
    background: url(/public/images/arrow_left.svg) no-repeat;
    width: 40px;
    height: 40px;
    translate: -50% -50%;
}

.arrows div:last-of-type {
    right: 0;
    background: url(/public/images/arrow-btn.svg) no-repeat;
    width: 40px;
    height: 40px;
    translate: 50% -50%;
}
.dots {
    position: absolute;
    display: flex;
    gap: 6px;
    bottom: 0;
}
.dots span:first-of-type {
    background: var(--primary);
}
.dots span {
    display: inline-block;
    background: var(--secondary);
    width: 14px;
    height: 14px;
    border-radius: 14px;
}

@media (max-width:1024px) {
    .text-content {
        position: relative;
        margin: 0;
    }
     h2 {
        margin-bottom: 20px;
    }
    .none {
        display: block;
        margin: 0;
        width: 100%;
        object-fit: cover;
        border-radius: 10px;
    }
    .text-content {
        width: 100%;
    }
    .img {
        display: none;
    }
    p {
        margin: 10px auto 15px;
        text-align: center;
    }
    .flex{
        flex-direction: column;
        align-items: center;
    }
    .arrows {
        width: fit-content;
        display: flex;
        right: 0;
        position: absolute;
        bottom: 68px;
        gap: 20px;
    }
    .desktop-arrows {
        display: none;
    }
    .arrows div {
        position: static;
    }
    .arrows div:first-of-type, .arrows div:last-of-type {
        translate: 0 0;
    }
    .dots {
    bottom: 82px;
    }
    .btn {
        margin: auto;
    }
}


@media (max-width:640px) {
    .flex {
        margin: 0;
    }
    img {
        width: 320px;
        height: 320px;

    }
    .btn {
        width: 100%;
    }
}
</style>