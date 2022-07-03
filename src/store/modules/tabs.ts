const useTabs = defineStore('Tabs', {
  state: () => {
    return {
      activeTab: 'layout',
      tabList: [
        {
          name: 'layout',
          path: '/layout',
          title: '布局',
        },
        {
          name: 'home',
          path: '/home',
          title: '首页',
        },
        {
          name: 'test',
          path: '/test',
          title: '测试',
        },
      ],
    };
  },

  actions: {},
});

export default useTabs;
