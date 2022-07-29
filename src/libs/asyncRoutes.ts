import { Store } from 'pinia';
import { Router } from 'vue-router';

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
      meta: {
        title: r.title,
        icon: r.icon,
        keepAlive: r.keepAlive,
      },
    };

    if (r.children) {
      routes.children = generateRoute(r.children);
      routes.redirect = routes.children[0].path;
    }

    return routes;
  });

  return newRoutes;
}

/**
 * @desc 递归遍历路由数据
 */
export function recursiveRoutes(
  tree: any[],
  views: Record<
    string,
    () => Promise<{
      [key: string]: /**
       * 转换树形结构-递归
       */
      any;
    }>
  >
) {
  return tree.map((node) => {
    const tempNode = node;
    if (tempNode.component) {
      tempNode.component = views[`../${tempNode.component}`];
    }

    if (tempNode.children && tempNode.children.length > 0) {
      recursiveRoutes(tempNode.children, views);
    }
    return tempNode;
  });
}

/**
 * @desc 添加动态路由
 */
export function addDynamicRoutes(
  userStore: { authRoutes: string | any[] },
  router: Router
) {
  if (userStore.authRoutes && userStore.authRoutes.length > 0) {
    const routesData = JSON.parse(JSON.stringify(userStore.authRoutes));

    const views = import.meta.glob('../views/**/*.vue');
    recursiveRoutes(routesData, views);
    routesData.forEach((item: any) => {
      if (item.name == 'dataScreen') {
        router.addRoute(item);
      } else {
        router.addRoute('layout', item);
      }
    });
  }
  // 404页面
  router.addRoute({
    path: '/:pathMatch(.*)',
    name: '404',
    component: () => import('@/components/errorPages/404.vue'),
    meta: {
      title: '无法找到该页面',
      layout: false,
    },
  });
}

// 清除动态路由
export function clearDynamicRoutes(
  userStore: Store<
    'Auth',
    {
      authToken: string;
      authBtns: {};
      authRoutes: Menu.RoutesList;
    },
    {},
    {
      setAuthToken(
        authToken: string
        // 将第一层和其他层的数据结构分开,然后再将其他层的数据筛选出放入其父级结构中
      ): void;
      setAuthRoutes(authRoutes: Menu.RoutesList): void;
      clearAuthToken(): void;
      clearAuthRoutes(): void;
    }
  >,
  router: { removeRoute: (arg0: any) => void }
) {
  if (userStore.authRoutes && userStore.authRoutes.length > 0) {
    userStore.authRoutes.forEach((item: any) => {
      router.removeRoute(item.name);
    });
    userStore.clearAuthRoutes();
  }
}
