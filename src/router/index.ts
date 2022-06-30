import { AxiosCanceler } from './../libs/helper/axiosCancel';
import NProgress from '@/libs/nprogress';
import { initMenuList } from '@/services/request';
import {
  formatTree,
  generateRoute,
  clearDynamicRoutes,
  addDynamicRoutes,
} from '@/libs/asyncRoutes';
import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  RouteRecordRaw,
  RouteRecordName,
} from 'vue-router';
import store from '@/store/index';
import { ElMessage } from 'element-plus';

// 创建路由表
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: { name: 'login' },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(), // 采用HTML5模式,使用 history.pushState API
  routes,
  // 切换页面，滚动到最顶部
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

// * 路由拦截 beforeEach
let registerRouteFresh = true;
router.beforeEach((to, from, next) => {
  NProgress.start();

  // * 在跳转路由之前，清除所有的请求
  const axiosCanceler = new AxiosCanceler();
  axiosCanceler.removeAllPending();

  // * 判断是否有Token
  const authStore = store().Auth;
  if (to.name !== 'login' && !authStore.authToken) {
    next({ name: 'login' });
    NProgress.done();
    ElMessage.error('您需要在登录后才有权限查看哦!');
    return;
  } else {
    if (to.name === 'login') {
      authStore.clearAuthToken();
      clearDynamicRoutes(authStore, router);
      NProgress.done();
    }
    if (!from.name && registerRouteFresh) {
      addDynamicRoutes(authStore, router);
      next({ ...to, replace: true });
      registerRouteFresh = false;
      NProgress.done();
    } else {
      NProgress.done();
      next();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
