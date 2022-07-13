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
const { log } = require('console');
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

// Login
app.get('/api/login', (req, res) => {
  console.log(req.query, '💙💛 前台登录获取的数据');

  let str = req.query.userName.concat(req.query.password);

  res.send({
    status: 200,
    msg: '登录成功',
    data: {
      access_token: md5(str),
      routeList: [
        {
          id: 1,
          pid: 0,
          name: 'home',
          path: '/home',
          title: '首页',
          icon: 'home-filled',
        },
        {
          id: 2,
          pid: 0,
          name: 'test',
          path: '/test',
          title: '测试',
          icon: 'goblet-square-full',
        },
        {
          id: 3,
          pid: 2,
          name: 'test1',
          path: '/test1',
          title: '测试1',
          icon: 'moon-night',
        },
        {
          id: 4,
          pid: 2,
          name: 'test2',
          path: '/test2',
          title: '测试2',
          icon: 'open',
        },
        {
          id: 5,
          pid: 2,
          name: 'test3',
          path: '/test3',
          title: '测试3',
          icon: 'operation',
        },
        {
          id: 6,
          pid: 0,
          name: 'table',
          path: '/table',
          icon: 'message-box',
          title: '表格',
        },
        {
          id: 7,
          pid: 6,
          name: 'excel',
          title: 'Excel',
          path: '/excel',
          icon: 'orange',
        },
        {
          id: 8,
          pid: 0,
          name: 'dataScreen',
          title: '数据大屏',
          path: '/dataScreen',
          icon: 'histogram',
        },
      ],
    },
  });
});

// Init TableData
app.post('/api/init/table-data', (req, res) => {
  if (req.body.uName) {
    if (req.body.uName === 'admin') {
      fs.readFile('table-data.json', 'utf-8', function (err, data) {
        if (err) {
          console.log(err, '💛💙 初始化表格数据失败');
        } else {
          res.send({
            status: 200,
            RESULT_MES: '💛💙初始化表格数据成功',
            RESULT_CODE: '0000',
            data: JSON.parse(data),
          });
        }
      });
    } else {
      res.send({
        RESULT_MES: '用户错误',
        RESULT_CODE: '0001',
        RESULT_DATA: [],
      });
    }
  } else {
    res.send({
      RESULT_MES: '请传入需要初始化的用户',
      RESULT_CODE: '0002',
    });
  }
});

// 启动服务器
app.listen(3001, () => {
  console.log('💙💛 服务在3001端口启动');
});
