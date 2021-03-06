import { FORM_DATA_HEADER } from '@/libs/constant';
import RequestHttp from '@/libs/http';

import {
  ILogin,
  LoginRes,
  ITableParam,
  TableList,
  ITable,
  IImportUserParams,
} from '@/libs/types';

// * 用户登录接口
export const login = (params: ILogin) => {
  return RequestHttp.get<LoginRes>('/api/login', params);
};

// * 初始化表格数据
export const initTable = (params: ITableParam) => {
  return RequestHttp.post<TableList>('/api/init/table-data', params);
};

// * 新增用户
export const addUser = (params: Partial<ITable>) => {
  return RequestHttp.post('/api/add-user', params);
};

// * 删除用户
export const delUser = (params: Partial<ITable>) => {
  return RequestHttp.post('/api/del-user', params);
};

// * 编辑用户
export const editUser = (params: Partial<ITable>) => {
  return RequestHttp.post('/api/edit-user', params);
};

// * 导出表格数据
export const exportUser = (params: IImportUserParams) => {
  return RequestHttp.post<BlobPart>(`/api/export-user`, params, {
    responseType: 'blob',
  });
};

// * 批量添加用户
export const batchAddUser = (params: FormData) => {
  return RequestHttp.post(`/api/import-user`, params, FORM_DATA_HEADER);
};

// * 批量添加用户
export const testCancel = (params: any) => {
  return RequestHttp.post(`/api/mock`, params);
};
