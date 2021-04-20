import { computed, unref } from 'vue';
import type { MenuSetting } from '/@/type/config';
import { MenuModeEnum, MenuTypeEnum, TriggerEnum } from '/@/enums/menuEnum';
import { appStore } from '/@/store/modules/app';

const getMenuSetting = computed(() => appStore.getProjectConfig.menuSetting);

const getMenuBgColor = computed(() => unref(getMenuSetting).bgColor);
const getMenuFixed = computed(() => unref(getMenuSetting).fixed);
const getCollapsed = computed(() => unref(getMenuSetting).collapsed);
const getShowLogoTitle = computed(() => unref(getMenuSetting).showLogoTitle);
const getMenuWidth = computed(() => unref(getMenuSetting).menuWidth);
const getMenuType = computed(() => unref(getMenuSetting).type);
const getMenuTheme = computed(() => unref(getMenuSetting).theme);
const getMenuMode = computed(() => unref(getMenuSetting).mode);
const getTopMenuAlign = computed(() => unref(getMenuSetting).topMenuAlign);
const getIsSidebarType = computed(() => unref(getMenuType) === MenuTypeEnum.SIDEBAR);
const getTrigger = computed(() => unref(getMenuSetting).trigger);
const getSplit = computed(() => unref(getMenuSetting).split);
const getShowMenu = computed(() => unref(getMenuSetting).show);
const getMenuHidden = computed(() => unref(getMenuSetting).hidden);

const getShowTopMenu = computed(() => {
  return unref(getMenuMode) === MenuModeEnum.HORIZONTAL || unref(getSplit);
});

const getShowHeaderTrigger = computed(() => {
  if (unref(getMenuType) === MenuTypeEnum.TOP_MENU || !unref(getShowMenu) || unref(getMenuHidden)) {
    return false;
  }

  return unref(getTrigger) === TriggerEnum.HEADER;
});

const getIsHorizontal = computed(() => {
  return unref(getMenuMode) === MenuModeEnum.HORIZONTAL;
});

const getIsMixSidebar = computed(() => {
  return unref(getMenuType) === MenuTypeEnum.MIX_SIDEBAR;
});


/**
 * @description 设置菜单配置
 * @param menuSetting
 */
function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
  appStore.COMMITPROJECTCONFIGSTATE({ menuSetting });
}
/**
 * @description 切换伸缩状态
 */

function toggleCollapsed() {
  setMenuSetting({
    collapsed: !unref(getCollapsed),
    menuWidth: !getCollapsed.value ? 56 : 240,
    showLogoTitle: !getCollapsed.value ? false : true,
  });
}

export function useMenuSetting() {
  return {
    setMenuSetting,
    toggleCollapsed,
    getMenuBgColor,
    getMenuFixed,
    getCollapsed,
    getShowLogoTitle,
    getMenuWidth,
    getMenuType,
    getMenuTheme,
    getMenuMode,
    getTopMenuAlign,
    getTrigger,
    getShowTopMenu,
    getShowHeaderTrigger,
    getIsSidebarType,
    getIsHorizontal,
    getIsMixSidebar,
  };
}
