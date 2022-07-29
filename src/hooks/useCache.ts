import { RouteRecordRaw, RouteRecordName } from 'vue-router';
import { routes } from '@/router';

import store from '@/store/index';
const authStore = store().Auth;

/**
 * @description 使用递归，过滤需要缓存的路由
 * @param {Array} _route 所有路由表
 * @param {Array} _cache 缓存的路由表
 * @return void
 * */
let cacheRouter: any[] = [];
const filterKeepAlive = (_route: any[], _cache: RouteRecordName[]): void => {
  _route.forEach((item) => {
    item.meta?.keepAlive && item.name && _cache.push(item.name);
    item.children &&
      item.children.length !== 0 &&
      filterKeepAlive(item.children, _cache);
  });
};

filterKeepAlive(authStore.authRoutes, cacheRouter);

export default cacheRouter;
