const useAuth = defineStore('Auth', {
  state: () => {
    return {
      authToken: '', // token
      authBtns: {}, // 用户权限按钮列表
      authRoutes: [] as Menu.RoutesList, // 用户权限路由列表
    };
  },

  actions: {
    setAuthToken(authToken: string) {
      this.authToken = authToken;
    },
    setAuthRoutes(authRoutes: Menu.RoutesList) {
      this.authRoutes = authRoutes;
    },

    clearAuthToken() {
      this.authToken = '';
    },
    clearAuthRoutes() {
      this.authRoutes = [];
    },
  },
});

export default useAuth;
