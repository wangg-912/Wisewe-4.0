import type { ProjectConfig } from '/@/type/config';//获取项目配置接口
import { PROJ_CFG_KEY } from '/@/enums/cacheEnum';//缓存key
import projectSetting from '/@/settings/projectSetting';//获取项目默认配置
import { getLocal } from '/@/utils/helper/persistent';

import { appStore } from '/@/store/modules/app';
import { deepMerge } from '/@/utils/tools';

export function initAppConfigStore(){
  let projCfg: ProjectConfig = getLocal(PROJ_CFG_KEY) as ProjectConfig;
  projCfg = deepMerge(projectSetting, projCfg || {});
  /* debugger; */
  try {
    
  } catch (error) {
    
  }
  appStore.COMMITPROJECTCONFIGSTATE(projCfg);
}

