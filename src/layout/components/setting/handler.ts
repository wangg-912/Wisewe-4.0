import { HandlerEnum } from './enums';
import { appStore } from '/@/store/modules/app';
import { ProjectConfig } from '/@/type/config';
import { useRootSetting } from '/@/hooks/setting/useRootSetting';
import { SettingButtonPositionEnum, ThemeEnum } from '/@/enums/appEnum';
import { updateHeaderBgColor, updateSidebarBgColor } from '/@/theme/updateBackground';
import { updateTheme } from '/@/theme/updateTheme';
import { updateGrayMode } from '/@/theme/updateGrayMode';
import { updateColorWeak } from '/@/theme/updateColorWeak';
import { useTagSetting } from '/@/hooks/setting/useTagSetting';
import { useTransitionSetting } from '/@/hooks/setting/useTransitionSetting';
import { useWatermark } from '/@/hooks/web/useWatermark';
/**
 * @description 配置类基础事件处理器
 * @param {HandlerEnum} event 事件枚举
 * @param {Object|String} value 值
 */
export function baseHandler(event: HandlerEnum, value: any) {
  const config = handler(event, value);
  appStore.COMMITPROJECTCONFIGSTATE(config);
}
function setLayoutSetting(type: string) {
  switch (type) {
    case 'mix':
      return {
        headerSetting: {
          bgColor: '#001529',
          theme: ThemeEnum.DARK,
        },
        menuSetting: {
          bgColor: '#001529',
          theme: ThemeEnum.DARK,
        },
      };
    case 'top-menu':
      return {
        headerSetting: {
          bgColor: '#ffffff',
          theme: ThemeEnum.LIGHT,
        },
        menuSetting: {
          bgColor: '#ffffff',
          theme: ThemeEnum.DARK,
        },
      };
    case 'mix-sidebar':
    case 'sidebar':
      return {
        headerSetting: {
          bgColor: '#ffffff',
          theme: ThemeEnum.LIGHT,
        },
        menuSetting: {
          bgColor: '#001529',
          theme: ThemeEnum.DARK,
        },
      };
    default:
      return {
        headerSetting: {
          bgColor: '#ffffff',
        },
        menuSetting: {
          bgColor: '#001529',
        },
      };
  }
}
/**
 * @description 配置类事件遍历机制
 */
export function handler(event: HandlerEnum, value: any): DeepPartial<ProjectConfig> {
  const { getThemeColor } = useRootSetting();
  const { setMenuSetting } = useTagSetting();
  const { setTransitionSetting } = useTransitionSetting();
  const { setWatermark, clear } = useWatermark();
  switch (event) {
    /* 更换布局结构 */
    case HandlerEnum.CHANGE_LAYOUT:
      const { mode, type, split } = value;
      const layoutSetting = setLayoutSetting(type);
      const { headerSetting, menuSetting } = layoutSetting;
      const splitOpt = split === undefined ? { split } : {};
      updateHeaderBgColor(headerSetting.bgColor);
      updateSidebarBgColor(menuSetting.bgColor);
      return {
        headerSetting,
        menuSetting: Object.assign(menuSetting, {
          mode,
          type,
          collapsed: false,
          show: true,
          ...splitOpt,
        }),
      };
    case HandlerEnum.CHANGE_THEME_COLOR:
      if (getThemeColor.value === value) {
        return {};
      }
      updateTheme(value);
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
    case HandlerEnum.GRAY_MODE:
      updateGrayMode(value);
      return { grayMode: value };
    case HandlerEnum.COLOR_WEAK:
      updateColorWeak(value);
      return { colorWeak: value };
    case HandlerEnum.WATER_MARK:
      value ? setWatermark('智汇校园管理系统') : clear();
      return { waterMark: value };
    case HandlerEnum.SHOW_FOOTER:
      return { showfooter: value };
    case HandlerEnum.TABS_SHOW:
      setMenuSetting({ tagsSetting: { show: value } });
      return { tagsSetting: { show: value } };
    case HandlerEnum.TABS_SHOW_CONTEXTMENU:
      setMenuSetting({ tagsSetting: { showContextmenu: value } });
      return { tagsSetting: { showContextmenu: value } };
    case HandlerEnum.TABS_SHOW_QUICK:
      setMenuSetting({ tagsSetting: { showQuick: value } });
      return { tagsSetting: { showQuick: value } };
    case HandlerEnum.OPEN_NPROGRESS:
      setTransitionSetting({ transitionSetting: { openNProgress: value } });
      return { transitionSetting: { openNProgress: value } };
    case HandlerEnum.OPEN_PAGE_LOADING:
      setTransitionSetting({ transitionSetting: { openPageLoading: value } });
      return { transitionSetting: { openPageLoading: value } };
    default:
      return {};
  }
}
