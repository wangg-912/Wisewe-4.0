import { createAsyncComponent } from '/@/utils/factory/asyncComponents';
export const ThemePicker = createAsyncComponent(() => import('./ThemePicker.vue'));
export const SwitchItem = createAsyncComponent(() => import('./SwitchItem.vue'));
