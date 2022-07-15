// 导入 express模块
const express = require('express');

// 导入加密模块
const md5 = require('js-md5');

// 读取文件
const fs = require('fs');

// 创建 web服务器
const app = express();

var multiparty = require('multiparty');

// 允许跨域资源共享
const cors = require('cors');
const { log } = require('console');
// app.use(cors());

app.use(
  cors({
    credentials: true,
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:8081',
    ], // web前端服务器地址
  })
);

//配置解析 application/json 格式数据的内置中间件
app.use(express.json());

//配置中间件解析post application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// 读取文件JSON数据
function read() {
  return fs.readFileSync('table-data.json', 'utf-8', function (err, data) {
    if (err) {
      console.log(err, '💛💙 初始化表格数据失败');
      return [];
    } else {
      return data;
    }
  });
}

// 书写文件JSON数据
function write(data) {
  let sortData = data.sort(sortList('id'));
  fs.writeFile('table-data.json', JSON.stringify(data), (err) => {
    if (err) console.log(err, '💛💙 写入新增用户数据失败');
    else {
      console.log(
        JSON.parse(fs.readFileSync('table-data.json', 'utf8')),
        '💛💙 写入新增用户数据成功'
      );
    }
  });
}

// 数组对象进行排序 按照一个指定的key对数组对象进行排序
function sortList(propertyName) {
  var datalist = (object1, object2) => {
    var value1 = object1[propertyName];
    var value2 = object2[propertyName];
    if (value1 < value2) {
      return -1;
    } else if (value1 > value2) {
      return 1;
    } else {
      return 0;
    }
  };
  return datalist;
}

// Login
app.get('/api/login', (req, res) => {
  console.log(req.query, '💙💛 前台登录获取的数据');

  let str = req.query.userName.concat(req.query.password);

  res.send({
    RESULT_MSG: '登录成功',
    RESULT_CODE: '0000',
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
      let reverseData = JSON.parse(read());

      if (reverseData && reverseData.length > 0) {
        res.send({
          RESULT_MSG: '💛💙初始化表格数据成功',
          RESULT_CODE: '0000',
          data: reverseData,
        });
      } else {
        res.send({
          RESULT_MSG: '初始化未知报错',
          RESULT_CODE: '0001',
          data: [],
        });
      }
    } else {
      res.send({
        RESULT_MSG: '用户错误',
        RESULT_CODE: '0001',
        RESULT_DATA: [],
      });
    }
  } else {
    res.send({
      RESULT_MSG: '请传入需要初始化的用户',
      RESULT_CODE: '0002',
    });
  }
});

// 新增用户
app.post('/api/add-user', (req, res) => {
  let reverseData = JSON.parse(read());

  if (!reverseData.find((item) => item.id == req.body.id)) {
    reverseData.push(req.body);
    write(reverseData);
    res.send({
      RESULT_MSG: '新增用户成功',
      RESULT_CODE: '0000',
    });
  } else {
    res.send({
      RESULT_MSG: '该用户已经创建,不能重复创建!',
      RESULT_CODE: '0003',
    });
  }
});

// 删除用户
app.post('/api/del-user', (req, res) => {
  let transferData = JSON.parse(read());

  if (transferData && transferData.length > 0) {
    if (transferData.find((item) => item.id == req.body.id)) {
      transferData = transferData.filter((item) => item.id != req.body.id);
      write(transferData);
      res.send({
        RESULT_MSG: '删除用户成功',
        RESULT_CODE: '0000',
      });
    } else {
      res.send({
        RESULT_MSG: '请不要删除不存在的用户',
        RESULT_CODE: '0002',
      });
    }
  } else {
    res.send({
      RESULT_MSG: '删除用户失败',
      RESULT_CODE: '0001',
    });
  }
});

// 编辑用户
app.post('/api/edit-user', (req, res) => {
  let transferData = JSON.parse(read());

  if (transferData && transferData.length > 0) {
    let idx = transferData.findIndex((item) => item.id == req.body.id);

    if (idx > 0) {
      transferData[idx] = Object.assign({ id: req.body.id }, req.body.data);
      write(transferData);
      res.send({
        RESULT_MSG: '编辑用户成功',
        RESULT_CODE: '0000',
      });
    } else {
      res.send({
        RESULT_MSG: '请不要编辑不存在的用户',
        RESULT_CODE: '0002',
      });
    }
  } else {
    res.send({
      RESULT_MSG: '编辑用户用户失败',
      RESULT_CODE: '0001',
    });
  }
});

// upload image
app.post('/api/upload-images', (req, res) => {
  console.log(req.body, '💛💙 上传图片');

  res.send({
    RESULT_MSG: '上传成功',
    RESULT_CODE: '0000',
  });
});

// 启动服务器
app.listen(3001, () => {
  console.log('💙💛 服务在3001端口启动');
});
