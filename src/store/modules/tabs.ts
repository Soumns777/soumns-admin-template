import { HOME_URL, TABS_BLACK_LIST } from '@/config/config';
import router from '@/router/index';
const useTabs = defineStore('Tabs', {
  state: () => {
    return {
      activeTabPath: 'home',
      tabList: [
        {
          name: 'home',
          path: '/home',
          title: '首页',
          close: false,
          icon: 'home-filled',
        },
      ] as Tabs.Tabs,
    };
  },

  actions: {
    setActiveTabName(activeTabPath: string) {
      this.activeTabPath = activeTabPath;
    },
    addTabs(tab: Tabs.ITab) {
      if (TABS_BLACK_LIST.includes(tab.path)) return;
      if (this.tabList.every((item) => item.path !== tab.path)) {
        this.tabList.push(tab);
      }
      this.setActiveTabName(tab.path);
    },

    removeTab(tabPath: string) {
      const tabList = JSON.parse(JSON.stringify(this.tabList));
      let activeTabPath = this.activeTabPath;

      if (tabPath === activeTabPath) {
        tabList.forEach((item: any, idx: number) => {
          // 优选后面的一项作为命中项
          const nextTab = tabList[idx + 1] || tabList[idx - 1];
          router.push(nextTab.path);
        });
      }
      this.tabList = tabList.filter(
        (item: { path: string }) => item.path !== tabPath
      );
    },

    // Close MultipleTab
    async closeMultipleTab(tabsMenuValue?: string) {
      this.tabList = this.tabList.filter((item) => {
        return item.path === tabsMenuValue || item.path === HOME_URL;
      });
    },

    removeAllTabs() {
      this.tabList = [];
      this.activeTabPath = 'home';
    },
  },
});

export default useTabs;
