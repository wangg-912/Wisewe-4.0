import { useAppProviderContext } from '/@/components/Applications';
import designSetting from '/@/settings/designSetting';
export function useDesign(scope: string) {
  const values = useAppProviderContext();

  return {
    // prefixCls: computed(() => `${values.prefixCls}-${scope}`),
    prefixCls: `${values.prefixCls || designSetting.prefixCls}-${scope}`,
    prefixVar: values.prefixCls || designSetting.prefixCls,
    // style,
  };
}
