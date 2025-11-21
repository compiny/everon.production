interface User {
  id: number;
  username: string;
  isAdmin?: boolean;
}

export const useAuth = () => {
  const isAuthenticated = ref(false);
  const user = ref<User | null>(null);

  // Проверяем аутентификацию
  const checkAuth = () => {
    if (process.client) {
      const token = localStorage.getItem('authToken');
      isAuthenticated.value = !!token;
    }
  };

  // Вход
  const login = async (username: string, password: string) => {
    try {
      const response = await $fetch<{ 
        success: boolean; 
        user: User 
      }>('/api/auth/login', {
        method: 'POST',
        body: { username, password }
      });

      if (response.success) {
        if (process.client) {
          localStorage.setItem('authToken', 'authenticated');
        }
        isAuthenticated.value = true;
        user.value = response.user;
        return { success: true };
      }
    } catch (error: any) {
      return { 
        success: false, 
        error: error.data?.message || 'Ошибка входа' 
      };
    }
  };

  // Выход
  const logout = async () => {
    if (process.client) {
      localStorage.removeItem('authToken');
    }
    isAuthenticated.value = false;
    user.value = null;
    
    try {
      await $fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Инициализируем при создании
  if (process.client) {
    checkAuth();
  }

  return {
    isAuthenticated,
    user,
    login,
    logout,
    checkAuth
  };
};