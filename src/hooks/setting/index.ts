import type { ProjectConfig } from '/@/types/config';
import getProjectSetting from '/@/settings/projectSetting';


export const useProjectSetting = (): ProjectConfig => {
  // TODO computed
  return getProjectSetting;
};
