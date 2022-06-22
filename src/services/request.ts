import RequestHttp from '@/libs/http';

import { IGenerateRoute, ILogin, LoginRes } from '@/libs/types';

// * 用户登录接口
export const login = (params: ILogin) => {
  return RequestHttp.get<LoginRes>('/api/login', params);
};

// * 获取菜单列表
export const initMenuList = (params: IGenerateRoute) => {
  return RequestHttp.get<Menu.MenuList>('/user-router-menu', params);
};
