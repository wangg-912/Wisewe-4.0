import type { ProjectConfig } from '/@/type/config'; //获取项目配置接口
import { PROJ_CFG_KEY } from '/@/enums/cacheEnum'; //缓存key
import projectSetting from '/@/settings/projectSetting'; //获取项目默认配置
import { getLocal } from '/@/utils/helper/persistent';
import { appStore } from '/@/store/modules/app';

import { updateHeaderBgColor, updateSidebarBgColor } from '/@/theme/updateBackground';
import { updateColorWeak } from '/@/theme/updateColorWeak';
import { updateGrayMode } from '/@/theme/updateGrayMode';
import { useWatermark } from '/@/hooks/web/useWatermark';

import { deepMerge } from '/@/utils/tools';
/**
 * @description 初始化App配置入状态机
 */
export function initAppConfigStore() {
  let projCfg: ProjectConfig = getLocal(PROJ_CFG_KEY) as ProjectConfig;
  projCfg = deepMerge(projectSetting, projCfg || {});
  const { setWatermark, clear } = useWatermark();
  try {
    const {
      colorWeak,
      grayMode,
      headerSetting: { bgColor: headerBgColor } = {},
      menuSetting: { bgColor } = {},
      waterMark,
    } = projCfg;
    headerBgColor && updateHeaderBgColor(headerBgColor);
    bgColor && updateSidebarBgColor(bgColor);
    grayMode && updateGrayMode(grayMode);
    colorWeak && updateColorWeak(colorWeak);
    waterMark ? setWatermark('智汇校园管理系统') : clear();
  } catch (error) {
    console.log(error);
  }
  appStore.COMMITPROJECTCONFIGSTATE(projCfg);
}
