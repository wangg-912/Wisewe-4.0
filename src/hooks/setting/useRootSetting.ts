import { computed, unref } from 'vue';
import { appStore } from '/@/store/modules/app';
import { ContentEnum } from '/@/enums/appEnum';
const getPageLoading = computed(() => appStore.getPageLoading);

export function useRootSetting() {
  return {
    getPageLoading,
  }
}
