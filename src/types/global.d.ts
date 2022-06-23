// * Menu 菜单列表
declare namespace Menu {
  interface IMenuOptions {
    id: number;
    pid: number;
    path: string;
    name: string;
    title: string;
    children?: IMenuOptions[];
  }

  type MenuList = IMenuOptions[];

  interface IRoutes {
    name: string;
    path: string;
    component: () => Promise<any>;
    children?: IRoutes[];
  }

  type RoutesList = IRoutes[];
}
