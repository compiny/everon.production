import { ref } from 'vue';

const useAuth = () => {
  const isAuthenticated = ref(false);
  const user = ref(null);
  const checkAuth = () => {
  };
  const login = async (username, password) => {
    try {
      const response = await $fetch("/api/auth/login", {
        method: "POST",
        body: { username, password }
      });
      if (response.success) {
        if (false) ;
        isAuthenticated.value = true;
        user.value = response.user;
        return { success: true };
      }
    } catch (error) {
      return {
        success: false,
        error: error.data?.message || "Ошибка входа"
      };
    }
  };
  const logout = async () => {
    isAuthenticated.value = false;
    user.value = null;
    try {
      await $fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return {
    isAuthenticated,
    user,
    login,
    logout,
    checkAuth
  };
};

export { useAuth as u };
//# sourceMappingURL=useAuth-CMDAbhFL.mjs.map
