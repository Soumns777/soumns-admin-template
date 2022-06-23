const useAuth = defineStore('Auth', {
  state: () => {
    return {
      authBtns: {}, // 用户权限按钮列表
      authRoutes: [] as Menu.RoutesList, // 用户权限路由列表
    };
  },

  actions: {
    async setAuthRoutes(authRoutes: Menu.RoutesList) {
      this.authRoutes = authRoutes;
    },
  },
});

export default useAuth;
