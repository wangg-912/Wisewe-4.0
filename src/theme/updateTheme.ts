import { appStore } from '/@/store/modules/app';
import { isHexColor } from '/@/utils/color';

/* console.log(version) */
export function updateTheme(color: string) {
  if (!isHexColor(color)) return;
  //changeTheme(color, oldColor);
  appStore.COMMITPROJECTCONFIGSTATE({
    themeColor: color,
  });
}
