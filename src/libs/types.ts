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
export interface ResultData extends Result {
  data: TableList;
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
  pageNum?: number; // 可选
  pageSize?: number; // 可选
}

export interface ITable {
  uId: number;
  uName: string;
  age: number;
  gender: string;
  location: string;
  total: number;
  [key: string]: any;
}

export type TableList = ITable[];
