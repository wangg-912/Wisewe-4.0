import { HandlerEnum } from './enums';
import {updateHeaderBgColor} from '/@/theme/updateBackground'
import { appStore } from '/@/store/modules/app';
import { ProjectConfig } from '/@/type/config';

import { useRootSetting } from '/@/hooks/setting/useRootSetting';

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
      /* updateSidebarBgColor(value); */
      return { menuSetting: { bgColor: value } };
    /* ==============顶栏=============== */
    case HandlerEnum.HEADER_THEME:
      updateHeaderBgColor(value);
      return { headerSetting: { bgColor: value } };
  }
}
