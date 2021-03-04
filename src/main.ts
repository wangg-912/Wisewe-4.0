import { createApp } from 'vue';

import ElementPlus from 'element-plus';
import { setupStore } from '/@/store';
import { setupRouter } from '/@/router';
import App from './App.vue';
import 'nprogress/nprogress.css';
import 'element-plus/lib/theme-chalk/index.css';
import '/@/style/index.scss';

const app = createApp(App);

app.use(ElementPlus, { size: 'small', zIndex: 3000 });

setupStore(app);
setupRouter(app);

app.mount('#app');
