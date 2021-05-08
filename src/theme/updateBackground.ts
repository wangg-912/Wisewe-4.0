import { isHexColor, colorIsDark, lighten, darken } from '/@/utils/color';
import { appStore } from '/@/store/modules/app';
import { ThemeEnum } from '/@/enums/appEnum';
import { setCssVar } from './util';

const HEADER_BG_COLOR_VAR = '--header-bg-color';
const HEADER_BG_HOVER_COLOR_VAR = '--header-bg-hover-color';
const HEADER_MENU_ACTIVE_BG_COLOR_VAR = '--header-active-menu-bg-color';

const SIDER_DARK_BG_COLOR = '--sider-dark-bg-color';
const SIDER_DARK_DARKEN_BG_COLOR = '--sider-dark-darken-bg-color';
const SIDER_LIGHTEN_1_BG_COLOR = '--sider-dark-lighten-1-bg-color';
const SIDER_LIGHTEN_2_BG_COLOR = '--sider-dark-lighten-2-bg-color';
/**
 * @description 更新顶栏背景色
 * @param {String} color 预设值
 * @returns null
 */
export function updateHeaderBgColor(color: string) {
  if (!isHexColor(color)) return;
  // bg color
  setCssVar(HEADER_BG_COLOR_VAR, color);

  // hover color
  const hoverColor = lighten(color, 6);
  setCssVar(HEADER_BG_HOVER_COLOR_VAR, hoverColor);
  setCssVar(HEADER_MENU_ACTIVE_BG_COLOR_VAR, hoverColor);

  // Determine the depth of the color value and automatically switch the theme
  const isDark = colorIsDark(color);

  appStore.COMMITPROJECTCONFIGSTATE({
    headerSetting: {
      theme: isDark ? ThemeEnum.DARK : ThemeEnum.LIGHT,
    },
  });
}

/**
 * @description 改变菜单颜色
 * @param {String} color 背景色
 */
export function updateSidebarBgColor(color: string) {
  if (!isHexColor(color)) return;

  setCssVar(SIDER_DARK_BG_COLOR, color);
  setCssVar(SIDER_DARK_DARKEN_BG_COLOR, darken(color, 6));
  setCssVar(SIDER_LIGHTEN_1_BG_COLOR, lighten(color, 5));
  setCssVar(SIDER_LIGHTEN_2_BG_COLOR, lighten(color, 8));

  // only #ffffff is light
  // Only when the background color is #fff, the theme of the menu will be changed to light
  const isLight = ['#fff', '#ffffff'].includes(color.toLowerCase());

  appStore.COMMITPROJECTCONFIGSTATE({
    menuSetting: {
      theme: isLight ? ThemeEnum.LIGHT : ThemeEnum.DARK,
    },
  });
}
