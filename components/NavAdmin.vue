<template>
  <div class="navbar" v-if="mounted">
    <div class="menu">
      <nuxt-link to="/admin">Заявки</nuxt-link>
      <nuxt-link to="/admin/categories">Категории</nuxt-link>
      <nuxt-link to="/admin/products">Товары</nuxt-link>
      <nuxt-link to="/admin/news">Новости</nuxt-link>
      <nuxt-link to="/admin/forms">Формы</nuxt-link>
    </div>
    <button @click="handleLogout" type="button">Выход &nbsp; →</button>
  </div>
</template>

<script setup>
const auth = useAuth();
const mounted = ref(false)

onMounted(() => {
  mounted.value = true
})

const handleLogout = async () => {
  await auth.logout();
  await navigateTo('/admin/login');
};
</script>
<style scoped>
.navbar {
  padding: 20px 0;
  position: fixed;
  height: 100vh;
  width: 160px;
  background: var(--secondary);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
a,button {
    display: block;
    text-transform: uppercase;
    color: var(--text-color);
    font-weight: 600;
    padding:15px 28px;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
    width: fit-content;
}
a:hover {
  transform: scale(1.05);
}
</style>