import { Ref } from 'vue';

/**
 * @desc 请求响应参数(不包含data)
 */
export interface Result {
  RESULT_CODE: string;
  RESULT_MSG: string;
}

/**
 * @desc 请求响应参数(包含data)
 */
export interface ResultData<T = any> extends Result {
  data: T;
  total: number;
}

/**
 * @desc 登录请求参数
 */
export interface ILogin {
  userName: string;
  password: string;
}

export interface LoginRes {
  routeList: Menu.Menus;
  access_token: string;
}

export interface ITodo {
  id: number;
  content: string;
  status: boolean;
}

export type ITodoList = ITodo[];

export interface IPlogin {
  user: ILogin;
  todoList: ITodoList;
  tid: number;
}

export interface IGenerateRoute {
  pid: number;
}

export interface IExpose {
  test_expose: string;
  changeExpose: (str: string) => void;
}

// 初始化表格数据
export interface ITableParam {
  uName: string;
  pageNum?: Ref;
  pageSize?: Ref;
  search?: {
    name?: string;
    gender?: string;
    age?: number | string;
  };
}

export interface ITable {
  uId: number;
  uName: string;
  age: string | number;
  gender: string;
  location: string;
  total: number;
  [key: string]: any;
}

export type TableList = ITable[];

export interface IImportUserParams {
  data: Partial<TableList>;
  fileName: string;
  keys: Array<string>;
}
