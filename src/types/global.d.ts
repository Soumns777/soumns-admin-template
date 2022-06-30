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
    redirect?: string;
    name: string;
    path: string;
    component: string;
    children?: IRoutes[];
  }

  type RoutesList = IRoutes[];

  interface IMenu {
    id: number;
    name: string;
    path: string;
    pid: number;
    title: string;
    children?: IMenu[];
  }

  type Menus = IMenu[];
}
