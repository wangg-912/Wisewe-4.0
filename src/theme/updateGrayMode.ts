import { toggleClass } from './util';

/**
 * @description 改变应用灰色模式
 * @param {Boolean} gray 是否开启标识
 */
export function updateGrayMode(gray: boolean) {
  toggleClass(gray, 'gray-mode', document.documentElement);
}
