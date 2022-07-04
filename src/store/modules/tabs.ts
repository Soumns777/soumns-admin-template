import router from '@/router/index';
const useTabs = defineStore('Tabs', {
  state: () => {
    return {
      activeTabName: 'home',
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
    setActiveTabName(activeTabName: string) {
      this.activeTabName = activeTabName;
    },
    addTabs(tab: Tabs.ITab) {
      if (this.tabList.every((item) => item.path !== tab.path)) {
        this.tabList.push(tab);
      }

      this.setActiveTabName(tab.name);
    },

    removeTabs(tabPath: string) {
      let activeTabName = this.activeTabName;
      const tabList = this.tabList;
      if (activeTabName === tabPath) {
        tabList.forEach((item, index) => {
          if (item.name !== tabPath) return;
          const nextTab = tabList[index + 1] || tabList[index - 1];
          if (!nextTab) return;
          activeTabName = nextTab.name;
          router.push({
            name: nextTab.name,
          });
        });
      }
      this.activeTabName = activeTabName;
      this.tabList = tabList.filter((item) => item.name !== tabPath);
    },

    removeAllTabs() {
      this.tabList = [];
      this.activeTabName = '/home';
    },
  },
});

export default useTabs;
