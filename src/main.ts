/* import 'windi.css'; */
import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import { setupStore } from '/@/store';
import { setupRouter } from '/@/router';
import 'nprogress/nprogress.css';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue';
import { isDevMode } from '/@/utils/env';
import 'dayjs/locale/zh-cn';
import locale from 'element-plus/lib/locale/lang/zh-cn';
import '/@/style/index.scss';
const app = createApp(App);

app.use(ElementPlus, { locale, size: 'small', zIndex: 3000 });

setupStore(app);
setupRouter(app);

/* router.isReady().then(() => { */
app.mount('#app');

// The development environment takes effect
if (isDevMode()) {
  app.config.performance = true;
  window.__APP__ = app;
}
window.process.cwd = () => '';
