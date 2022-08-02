import { HOME_URL } from './../config/config';
import { AxiosCanceler } from './../libs/helper/axiosCancel';
import NProgress from '@/libs/nprogress';

import { clearDynamicRoutes, addDynamicRoutes } from '@/libs/asyncRoutes';
import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  RouteRecordRaw,
} from 'vue-router';

import { ElMessage } from 'element-plus';
import store from '@/store/index';

// 创建路由表
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: { name: 'login' },
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      keepAlive: true,
    },
    component: () => import('@/views/login/index.vue'),
  },

  {
    path: '/layout',
    name: 'layout',
    meta: {
      keepAlive: true,
    },
    component: () => import('@/views/layout/index.vue'),
    redirect: HOME_URL,
  },

  {
    path: '/dataScreen',
    name: 'dataScreen',
    meta: {
      keepAlive: true,
    },
    component: () => import('@/views/dataScreen/index.vue'),
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
  const tabStore = store().Tabs;
  if (to.name !== 'login' && !authStore.authToken) {
    next({ name: 'login' });
    NProgress.done();
    ElMessage.error('您需要在登录后才有权限查看哦!');
    return;
  } else {
    if (to.name === 'login') {
      // 清除权限列表和tabs信息
      authStore.clearAuthToken();
      clearDynamicRoutes(authStore, router);
      tabStore.closeMultipleTab();
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
