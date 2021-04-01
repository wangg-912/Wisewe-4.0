import { computed, unref } from 'vue';
import type { MenuSetting } from '/@/type/config';
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
const getTrigger = computed(() => unref(getMenuSetting).trigger);

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
    menuWidth: !getCollapsed.value ? 64 : 240,
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
  };
}
