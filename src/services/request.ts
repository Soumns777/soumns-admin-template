import RequestHttp from '@/libs/http';

import { Login, LoginRes } from '@/libs/types';

// * 用户登录接口
export const login = (params: Login) => {
  return RequestHttp.get<LoginRes>('/getMock', params);
};
