<template>
  <div class="container">
    <div>
      <h3>
        Вход в панель управления
      </h3>
    </div>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Логин</label>
        <input
          id="username"
          v-model="username"
          type="text"
          required
          placeholder="Введите логин"
        />
      </div>
      <div>
        <label for="password">Пароль</label>
        <input
          id="password"
          v-model="password"
          type="password"
          required
          placeholder="Введите пароль"
        />
      </div>
        <button
          type="submit"
          :disabled="loading"
        >
          {{ loading ? 'Вход...' : 'Войти' }}
        </button>
      <div v-if="error">
        {{ error }}
      </div>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth' 
})
const username = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

const auth = useAuth();

const handleLogin = async () => {
  loading.value = true;
  error.value = '';

  const result = await auth.login(username.value, password.value);
  
  if (result.success) {
    await navigateTo('/admin');
  } else {
    error.value = result.error;
  }
  
  loading.value = false;
};
</script>
<style scoped>
.container{
  margin:10% auto 0;
  width: fit-content;
}
h3 {
  font-weight: 700;
  margin-bottom: 30px;
}
input {
  display: block;
  height: 40px;
  border-radius: 40px;
  width: 100%;
  padding: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  background: #E8F3FF;
}

button {
  width: 100%;
  background: var(--secondary);
  color:var(--text-color);
  height: 40px;
  border-radius: 40px;
  font-weight: 600;
  margin-top: 20px;
}
</style>