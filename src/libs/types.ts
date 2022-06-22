/**
 * @desc 请求响应参数(不包含data)
 */
export interface Result {
  code: string;
  msg: string;
  status: string;
}

/**
 * @desc 请求响应参数(包含data)
 */
export interface ResultData<T = any> extends Result {
  data?: T;
}

/**
 * @desc 登录请求参数
 */
export interface ILogin {
  userName: string;
  password: string;
}

export interface LoginRes {
  access_token: string;
}

// type GET_HTTP = ResultData<LoginRes>;

// let get_http: GET_HTTP = {
//   code: '200',
//   msg: '测试',
//   status: '200',
//   data: {
//     access_token: '1eqwe',
//   },
// };

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
