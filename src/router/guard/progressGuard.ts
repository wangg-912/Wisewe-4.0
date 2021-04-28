import type { Router } from 'vue-router';
import { useTransitionSetting } from '/@/hooks/setting/useTransitionSetting';
import nProgress from 'nprogress';
import { unref } from 'vue';
// 配置NProgress进度条选项 —— 动画效果
nProgress.configure({ ease: 'ease', speed: 500 })
const { getOpenNProgress } = useTransitionSetting();
export function createProgressGuard(router: Router) {  router.beforeEach(async (to) => {
    if (to.meta.loaded) return true;
    unref(getOpenNProgress) && nProgress.start();
    return true;
  });

  router.afterEach(async (to) => {
    if (to.meta.loaded) return true;
    unref(getOpenNProgress) && nProgress.done();
    return true;
  });
}
