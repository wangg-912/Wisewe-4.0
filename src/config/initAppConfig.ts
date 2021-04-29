import type { ProjectConfig } from '/@/type/config';//获取项目配置接口
import { PROJ_CFG_KEY } from '/@/enums/cacheEnum';//缓存key
import projectSetting from '/@/settings/projectSetting';//获取项目默认配置
import { getLocal } from '/@/utils/helper/persistent';
import { appStore } from '/@/store/modules/app';

import { updateHeaderBgColor, updateSidebarBgColor } from '/@/theme/updateBackground';
import { updateColorWeak } from '/@/theme/updateColorWeak';
import { updateGrayMode } from '/@/theme/updateGrayMode';

import { deepMerge } from '/@/utils/tools';

export function initAppConfigStore(){
  let projCfg: ProjectConfig = getLocal(PROJ_CFG_KEY) as ProjectConfig;
  projCfg = deepMerge(projectSetting, projCfg || {});
  /* debugger; */
  try {
    const {
      colorWeak,
      grayMode,
      themeColor,
      headerSetting: { bgColor: headerBgColor } = {},
      menuSetting: { bgColor } = {},
    } = projCfg;
    if (themeColor && themeColor !== '#409eff') {
      //changeTheme(themeColor);
    }
    headerBgColor && updateHeaderBgColor(headerBgColor);
    bgColor && updateSidebarBgColor(bgColor);
    grayMode && updateGrayMode(grayMode);
    colorWeak && updateColorWeak(colorWeak);
  } catch (error) {
    console.log(error);
  }
  appStore.COMMITPROJECTCONFIGSTATE(projCfg);
}
