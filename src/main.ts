import 'element-plus/theme-chalk/dark/css-vars.css';
import 'element-plus/dist/index.css';
import { createPersistedState } from 'pinia-persistedstate-plugin';
import App from './App.vue';
import 'uno.css';
import router from '@/router/index';

import * as Icons from '@element-plus/icons-vue';
const app = createApp(App);

// 注册element Icons组件
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key as keyof typeof Icons]);
});

// 引入vconsole
// import VConsole from 'vconsole';
// import { initPlugin } from 'vue-vconsole-devtools';
// initPlugin(new VConsole());

const store = createPinia();
store.use(createPersistedState());

app.use(store).use(router).mount('#app');
