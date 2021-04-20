import { HandlerEnum } from './enums';
import { updateHeaderBgColor, updateSidebarBgColor } from '/@/theme/updateBackground'
import { appStore } from '/@/store/modules/app';
import { ProjectConfig } from '/@/type/config';

import { useRootSetting } from '/@/hooks/setting/useRootSetting';
import { SettingButtonPositionEnum } from '/@/enums/appEnum';

export function baseHandler(event: HandlerEnum, value: any) {
  const config = handler(event, value);
  appStore.COMMITPROJECTCONFIGSTATE(config);
}

export function handler(event: HandlerEnum, value: any): DeepPartial<ProjectConfig> {
  const { getThemeColor } = useRootSetting();
  switch (event) {
    /* 更换布局结构 */
    case HandlerEnum.CHANGE_LAYOUT:
      const { mode, type, split } = value;
      const splitOpt = split === undefined ? { split } : {};
      return {
        menuSetting: {
          mode,
          type,
          collapsed: false,
          show: true,
          hidden: false,
          ...splitOpt,
        },
      };
    case HandlerEnum.CHANGE_THEME_COLOR:
      if (getThemeColor.value === value) {
        return {};
      }
      /* debugger; */
      /* changeTheme(value); */
      return { themeColor: value };
    /* ==============菜单=============== */
    case HandlerEnum.MENU_THEME:
      updateSidebarBgColor(value);
      return { menuSetting: { bgColor: value } };
    /* ==============顶栏=============== */
    case HandlerEnum.HEADER_THEME:
      updateHeaderBgColor(value);
      return { headerSetting: { bgColor: value } };

    /* =============其他配置================= */
    case HandlerEnum.SHOW_LOGO:
      return { showLogo: value };

    case HandlerEnum.HEADER_SHOW:
      return {
        headerSetting: { show: value },
        settingButtonPosition: value
          ? SettingButtonPositionEnum.HEADER
          : SettingButtonPositionEnum.FIXED,
      };

    case HandlerEnum.SHOW_BREADCRUMB:
      return { showBreadCrumb: value };

    case HandlerEnum.SHOW_BREADCRUMB_ICON:
      return { showBreadCrumbIcon: value };

    default:
      return {};
  }
}
