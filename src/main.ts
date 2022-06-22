import 'element-plus/theme-chalk/dark/css-vars.css';
import 'element-plus/dist/index.css'; // element css
import { createPersistedState } from 'pinia-persistedstate-plugin';
import App from './App.vue';

import router from '@/router/index';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'uno.css';
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 引入vconsole
// import VConsole from 'vconsole';
// import { initPlugin } from 'vue-vconsole-devtools';
// initPlugin(new VConsole());

const store = createPinia();
store.use(createPersistedState());

createApp(App).use(router).use(store).mount('#app');
