import type { Router } from 'vue-router';
import { unref } from 'vue';
import NProgress from 'nprogress';
import { appStore } from '/@/store/modules/app';
import { useTransitionSetting } from '/@/hooks/setting/useTransitionSetting';
// 配置NProgress进度条选项 —— 动画效果
NProgress.configure({ ease: 'ease', speed: 500 })
const { getOpenPageLoading } = useTransitionSetting();

export function createPageLoadingGuard(router: Router) {
  router.beforeEach(async (to) => {
    //TODO
    NProgress.start();
    /* debugger; */
    if (unref(getOpenPageLoading)) {
      /* debugger; */
      appStore.setPageLoadingAction(true);
      return true;
    }
    return true;
  });
  router.afterEach(async () => {
    if (unref(getOpenPageLoading)) {
      /* debugger; */
      setTimeout(() => {
        appStore.commitPageLoadingState(false);
      }, 300);
    }
    NProgress.done();
    return true;
  })

}
