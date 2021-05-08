import type { ProjectConfig, GlobConfig, GlobEnvConfig } from '/@/types/config';
import getProjectSetting from '/@/settings/projectSetting';
import { getShortName } from '/@/config/shortName';
import { warn } from '/@/utils/log';
import { getGlobEnvConfig, isDevMode } from '/@/utils/env';
const reg = /[a-zA-Z\_]*/;
const ENV_NAME = getShortName(import.meta.env);
const ENV = ((isDevMode()
  ? getGlobEnvConfig()
  : window[ENV_NAME as any]) as unknown) as GlobEnvConfig;

const { VITE_GLOB_APP_TITLE, VITE_GLOB_APP_SHORT_NAME } = ENV || {
  VITE_GLOB_APP_TITLE: '智汇校园管理系统',
  VITE_GLOB_APP_SHORT_NAME: 'Wisewe_App',
};

if (!reg.test(VITE_GLOB_APP_SHORT_NAME)) {
  warn(
    `VITE_GLOB_APP_SHORT_NAME Variables can only be characters/underscores, please modify in the environment variables and re-running.`
  );
}
export const useGlobSetting = (): Readonly<GlobConfig> => {
  const glob: Readonly<GlobConfig> = {
    title: VITE_GLOB_APP_TITLE,
    shortName: VITE_GLOB_APP_SHORT_NAME,
  };
  return glob as Readonly<GlobConfig>;
};

export const useProjectSetting = (): ProjectConfig => {
  return getProjectSetting;
};
