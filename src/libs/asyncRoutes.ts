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

/**
 * @desc 转换成router基础路由列表
 */
export function generateRoute(userRoutes: Menu.MenuList) {
  let newRoutes = userRoutes.map((r, i) => {
    let routes: Menu.IRoutes = {
      path: r.path,
      name: r.name,
      component: `views/${r.name}/index.vue`,
    };

    if (r.children) {
      routes.children = generateRoute(r.children);
    }

    return routes;
  });

  return newRoutes;
}

/**
 * @desc 递归动态添加路由
 */
