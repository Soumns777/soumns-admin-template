const useTabs = defineStore('Tabs', {
  state: () => {
    return {
      activeTabName: '/home',
      tabList: [] as Tabs.Tabs,
    };
  },

  actions: {
    setActiveTabName(activeTabName: string) {
      this.activeTabName = activeTabName;
    },
    setTabList(tabList: Tabs.Tabs) {
      this.tabList = tabList;
    },
  },
});

export default useTabs;
