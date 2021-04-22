import { createApp } from 'vue';

import ElementPlus from 'element-plus';
import { setupStore } from '/@/store';
import { setupRouter } from '/@/router';
import App from './App.vue';
import { isDevMode } from '/@/utils/env';
import 'nprogress/nprogress.css';
import '/@/style/variables/element-variables.scss';
import '/@/style/index.scss';

const app = createApp(App);

app.use(ElementPlus, { size: 'small', zIndex: 3000 });

setupStore(app);
setupRouter(app);

/* router.isReady().then(() => { */
app.mount('#app');


// The development environment takes effect
if (isDevMode()) {
  app.config.performance = true;
  window.__APP__ = app;
}
