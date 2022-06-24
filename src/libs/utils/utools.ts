/**
 * 使用递归处理路由菜单
 * @param newArr 所有菜单数组
 */
/**
 * 转换树形结构-递归
 */
export function formatTree(data: Menu.MenuList) {
  // 将第一层和其他层的数据结构分开,然后再将其他层的数据筛选出放入其父级结构中
  let parents = data.filter((b: { pid: number }) => b.pid === 0);
  let children = data.filter((c: { pid: number }) => c.pid !== 0);

  dataToTree(parents, children);

  function dataToTree(parents: any[], children: any[]) {
    parents.map((b) => {
      children.map((c, i) => {
        if (c.pid === b.id) {
          // vue2 template转AST树
          let _c = JSON.parse(JSON.stringify(children));

          //  删除当前的children,继续作为父亲寻找自己的子节点
          _c.splice(i, 1);

          // 继续递归,找出剩下子节点自己的子节点
          dataToTree([c], _c);

          if (b.children) {
            b.children.push(c);
          } else {
            b.children = [c];
          }
        }
      });
    });
  }

  return parents;
}

const modules = import.meta.glob('@/views/*/*.vue');

// console.log(modules, '💙💛 modules');

/**
 * @desc 转换router列表
 */
export function generateRoute(userRoutes: Menu.MenuList) {
  console.log(userRoutes, '💙💛 userRoutes');
  let newRoutes = userRoutes.map((r, i) => {
    let routes: Menu.IRoutes = {
      path: r.path,
      name: r.name,
      component: () => import(/* @vite-ignore */ `@/views/${r.name}.vue`),
      // component: modules[`../views/${routes.component}`],
    };

    if (r.children) {
      routes.children = generateRoute(r.children);
    }

    return routes;
  });

  return newRoutes;
}

/**
 * @description 对象数组深克隆
 * @param obj 源对象
 * @returns {obj} 克隆后的对象
 */
export function deepCopy<T>(obj: any): T {
  let newObj: any;
  try {
    newObj = obj.push ? [] : {};
  } catch (error) {
    newObj = {};
  }
  for (let attr in obj) {
    if (typeof obj[attr] === 'object') {
      newObj[attr] = deepCopy(obj[attr]);
    } else {
      newObj[attr] = obj[attr];
    }
  }
  return newObj;
}

/**
 * @description 生成随机数
 * @param min 最小值
 * @param max 最大值
 * @returns {number}
 */
export function randomNum(min: number, max: number): number {
  let num = Math.floor(Math.random() * (min - max) + max);
  return num;
}
