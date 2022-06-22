// 导入 express模块
const express = require('express');

// 导入加密模块
const md5 = require('js-md5');

// 读取文件
const fs = require('fs');

// 创建 web服务器
const app = express();

// 允许跨域资源共享
const cors = require('cors');
// app.use(cors());

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000', // web前端服务器地址
  })
);

//配置解析 application/json 格式数据的内置中间件
app.use(express.json());

//配置中间件解析post application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

app.get('/api/login', (req, res) => {
  console.log(req.query, '💙💛 前台登录获取的数据');

  let str = req.query.userName.concat(req.query.password);

  fs.writeFile(
    'login.json',

    JSON.stringify([
      {
        userName: req.query.userName,
        password: req.query.password,
        access_token: md5(str),
      },
    ]),

    (err) => {
      if (err) {
        return;
      }
    }
  );

  res.send({
    status: 200,
    msg: '登录成功',
    data: {
      access_token: md5(str),
    },
  });
});

app.get('/user-router-menu', (req, res) => {
  console.log(req.body, '--> 初始化路由列表');
  res.send({
    status: 200,
    msg: 'post成功',
    RESULT_MES: '成功',
    data: [
      {
        id: 1,
        pid: 0,
        name: 'home1',
        path: '/home1',
        title: '首页',
      },
      {
        id: 2,
        pid: 1,
        name: 'login',
        path: '/home1/login',
        title: '首页-登录',
      },
      {
        id: 3,
        pid: 0,
        name: 'table',
        title: '表格',
        path: '/table',
      },
      {
        id: 4,
        pid: 3,
        name: 'excel',
        title: '表格-Excel',
        path: '/table/excel',
      },
      {
        id: 5,
        pid: 0,
        name: 'theme',
        title: '主题',
        path: '/theme',
      },
    ],
  });
});

// 启动服务器
app.listen(3001, () => {
  console.log('💙💛 服务在3001端口启动');
});
