import { useAppProviderContext } from '/@/components/Applications';
import { computed, unref } from 'vue';

export function useAppInject() {
  const values = useAppProviderContext();
  return {
    getIsMobile: computed(() => unref(values.isMobile)),
  };
}
