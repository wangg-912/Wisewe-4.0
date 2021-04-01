import { getEnv } from '/@/utils/env';
import { useGlobSetting } from '/@/hooks/setting';
import pkg from '../../../package.json';
const globSetting = useGlobSetting();
// 根据版本生成缓存密钥
export function getStorageShortName() {
  return `${globSetting.shortName}__${getEnv()}${`__${pkg.version}`}__`.toUpperCase();
}
