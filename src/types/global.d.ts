// * Menu 菜单列表
declare namespace Menu {
  interface IMenuOptions {
    icon?: string;
    id: number;
    pid: number;
    path: string;
    name: string;
    title: string;
    children?: IMenuOptions[];
  }

  type MenuList = IMenuOptions[];

  interface IMeta {
    title: string;
    icon?: string;
    requireAuth?: boolean;
  }

  interface IRoutes {
    redirect?: string;
    name: string;
    path: string;
    component: string;
    meta: IMeta;
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

declare namespace Tabs {
  interface ITab {
    name: string;
    path: string;
    title: string;
    close: boolean;
    icon?: string;
  }

  type Tabs = ITab[];
}
