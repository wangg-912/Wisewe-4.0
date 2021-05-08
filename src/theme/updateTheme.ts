import { appStore } from '/@/store/modules/app';
import { isHexColor } from '/@/utils/color';

/**
 * @description 改变应用主题
 * @param {String} color 颜色值
 * @returns
 */
export function updateTheme(color: string) {
  if (!isHexColor(color)) return;
  appStore.COMMITPROJECTCONFIGSTATE({
    themeColor: color,
  });
}
