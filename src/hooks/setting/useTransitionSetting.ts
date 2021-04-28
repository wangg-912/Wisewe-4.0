import { computed, unref } from 'vue';
import type { TransitionSetting } from '/@/type/config';
import { appStore } from '/@/store/modules/app';

const getTransitionSetting = computed(() => appStore.getProjectConfig.transitionSetting);

const getEnableTransition = computed(() => unref(getTransitionSetting)?.enable);

const getOpenNProgress = computed(() => unref(getTransitionSetting)?.openNProgress);

const getOpenPageLoading = computed((): boolean => {
  return !!unref(getTransitionSetting)?.openPageLoading;
});
const getBasicTransition = computed(() => unref(getTransitionSetting)?.basicTransition);

function setTransitionSetting(transitionSetting: Partial<TransitionSetting>) {
  appStore.COMMITPROJECTCONFIGSTATE({ transitionSetting });
}

export function useTransitionSetting() {
  return {
    setTransitionSetting,

    getTransitionSetting,
    getEnableTransition,
    getOpenNProgress,
    getOpenPageLoading,
    getBasicTransition,
  };
}
