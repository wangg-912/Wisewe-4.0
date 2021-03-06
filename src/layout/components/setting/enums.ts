/* import { ContentEnum, RouterTransitionEnum } from '/@/enums/appEnum'; */
import { MenuModeEnum, MenuTypeEnum } from '/@/enums/menuEnum';
/**
 * @description 布局类型枚举
 */
export const menuTypeList = [
  {
    title: '左栏菜单布局',
    mode: MenuModeEnum.INLINE,
    type: MenuTypeEnum.SIDEBAR,
  },
  {
    title: '顶栏菜单混合布局',
    mode: MenuModeEnum.INLINE,
    type: MenuTypeEnum.MIX,
  },
  {
    title: '顶栏菜单布局',
    mode: MenuModeEnum.HORIZONTAL,
    type: MenuTypeEnum.TOP_MENU,
  },
  {
    title: '左栏固定菜单布局',
    mode: MenuModeEnum.INLINE,
    type: MenuTypeEnum.MIX_SIDEBAR,
  },
];

/**
 * @description 事件枚举
 */
export enum HandlerEnum {
  CHANGE_LAYOUT,
  CHANGE_THEME_COLOR,
  /* menu */
  MENU_TRIGGER,
  MENU_COLLAPSED,
  MENU_COLLAPSED_SHOW_TITLE,
  MENU_WIDTH,
  MENU_SHOW_SIDEBAR,
  MENU_THEME,
  /* header */
  HEADER_SHOW,
  HEADER_THEME,
  HEADER_FIXED,
  HEADER_SEARCH,
  SHOW_BREADCRUMB,
  SHOW_BREADCRUMB_ICON,
  GRAY_MODE,
  COLOR_WEAK,
  SHOW_LOGO,
  SHOW_FOOTER,

  /* tags */
  TABS_SHOW,
  TABS_SHOW_CONTEXTMENU,
  TABS_SHOW_QUICK,
  /* transition */
  OPEN_NPROGRESS,
  OPEN_PAGE_LOADING,
  WATER_MARK,
}
