// 服务器
const express = require('express'); // 导入 express模块

const app = express(); // 创建 web服务器

const cors = require('cors'); // 允许跨域资源共享
app.use(cors());

app.use(express.json()); //配置解析 application/json 格式数据的内置中间件
app.use(express.urlencoded({ extended: false })); //配置中间件解析post application/x-www-form-urlencoded

// 初始化
app.get('/', (req, res) => {
  res.send({
    status: 200,
    msg: 'success',
  });
});

// test
app.get('/test', (req, res) => {
  res.send({
    status: 200,
    msg: 'success',
    RESULT_MSG: 'TEST',
  });
});

// 登录换取token
app.post('/login', (req, res) => {
  console.log(req.body, '---->获取token');
  let data = {};
  if (req.body.name !== 'soumns' || req.body.password !== '123') {
    data = {
      status: 404,
      msg: '登录账号或密码错误,请重新进行检查后再进行登录',
    };
  } else {
    data = {
      status: 200,
      msg: '登录成功!',
      data: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImtqanI1ODgiLCJ1c2VybmFtZSI6ImFkbWluIn0.NIe8ATpl9axcsiTYUP_gdLIVtNIe8ATpl9axcsiTYUP_gdLIVtPPLKjmkGQPDJ60VoCQPPLKjmkGQPDJ60VoCQ',
      },
    };
  }

  res.send(data);
});

// Vue3-todo-list数据服务
app.get('/getList', (req, res) => {
  console.log(req.query, '--->获取listData');
  res.send({
    status: 200,
    msg: 'success',
    data: [
      {
        id: 1,
        done: false,
        content: '111',
      },
      {
        id: 2,
        done: true,
        content: '222',
      },
      {
        id: 3,
        done: false,
        content: '333',
      },
      {
        id: 4,
        done: true,
        content: '444',
      },
    ],
  });
});

// 启动服务器
app.listen(3001, () => {
  console.log('服务在3001端口上启动开始💙💛!');
});
