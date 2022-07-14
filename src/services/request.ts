import RequestHttp from '@/libs/http';

import { ILogin, LoginRes, ITableParam, TableList } from '@/libs/types';

// * 用户登录接口
export const login = (params: ILogin) => {
  return RequestHttp.get<LoginRes>('/api/login', params);
};

// * 初始化表格数据
export const initTable = (params: ITableParam) => {
  return RequestHttp.post<TableList>('/api/init/table-data', params);
};

// * 上传图片
export const uploadImgs = (params: any) => {
  return RequestHttp.post<any>('/api/upload-images', params, {
    headers: {
      'Content-Type': 'multipart/form-data;charset=UTF-8',
    },
  });
};
