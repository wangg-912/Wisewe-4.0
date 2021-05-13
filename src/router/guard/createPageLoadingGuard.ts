import type { Router } from 'vue-router';
import { unref } from 'vue';
import { appStore } from '/@/store/modules/app';
import { useTransitionSetting } from '/@/hooks/setting/useTransitionSetting';

const { getOpenPageLoading } = useTransitionSetting();

export function createPageLoadingGuard(router: Router) {
  router.beforeEach(async (to) => {
    if (to.meta.loaded) {
      return true;
    }
    if (unref(getOpenPageLoading)) {
      appStore.setPageLoadingAction(true);
      return true;
    }
    return true;
  });
  router.afterEach(async () => {
    if (unref(getOpenPageLoading)) {
      setTimeout(() => {
        appStore.SETPAGELOADINGSTATE(false);
      }, 350);
    }
    return true;
  });
}
