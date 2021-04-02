import type { HeaderSetting } from '/@/type/config';
import { computed, unref } from 'vue';
import { appStore } from '/@/store/modules/app';

import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
import { useRootSetting } from '/@/hooks/setting/useRootSetting';
import { MenuModeEnum } from '/@/enums/menuEnum';

const {
  getMenuMode,
  getSplit,
  getIsSidebarType,
  getShowHeaderTrigger,
  getIsTopMenu,
} = useMenuSetting();
const { getShowBreadCrumb, getShowLogo } = useRootSetting();

/**
 * @description 获取头部配置
 */
const getHeaderSetting = computed(() => appStore.getProjectConfig.headerSetting);

/* bgColor: string;
  fixed: boolean;
  show: boolean;
  theme: ThemeEnum;
  showFullScreen: boolean;
  showNotice: boolean;
  showSearch: boolean; */
const getHeaderTheme = computed(() => unref(getHeaderSetting).theme);
const getShowHeader = computed(() => unref(getHeaderSetting).show);
const getFixed = computed(() => unref(getHeaderSetting).fixed);
const getHeaderBgColor = computed(() => unref(getHeaderSetting).bgColor);
const getShowSearch = computed(() => unref(getHeaderSetting).showSearch);
const getShowFullScreen = computed(() => unref(getHeaderSetting).showFullScreen);
const getShowNotice = computed(() => unref(getHeaderSetting).showNotice);

const getShowBread = computed(() => {
  return (
    unref(getMenuMode) !== MenuModeEnum.HORIZONTAL && unref(getShowBreadCrumb) && !unref(getSplit)
  );
});

const getShowHeaderLogo = computed(() => {
  return unref(getShowLogo) && !unref(getIsSidebarType);
});

/**
 * @description 设置头部配置
 * @param headerSetting
 */
function setHeaderSetting(headerSetting: Partial<HeaderSetting>): void {
  appStore.COMMITPROJECTCONFIGSTATE({ headerSetting });
}

export function useHeaderSetting() {
  return {
    setHeaderSetting,
    getHeaderSetting,
    getShowSearch,
    getHeaderTheme,
    getShowFullScreen,
    getShowNotice,
    getShowBread,
    getShowHeaderLogo,
    getShowHeader,
    getFixed,
    /* getShowMixHeaderRef,
    getShowFullHeaderRef,
    getShowInsetHeaderRef,
    getUnFixedAndFull, */
    getHeaderBgColor,
  };
}
