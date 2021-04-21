import { createAsyncComponent } from '/@/utils/factory/asyncComponents';
export const AppTheme = createAsyncComponent(() => import('./AppTheme.vue'));
export const ThemePicker = createAsyncComponent(() => import('./ThemePicker.vue'));
export const SwitchItem = createAsyncComponent(() => import('./SwitchItem.vue'));
