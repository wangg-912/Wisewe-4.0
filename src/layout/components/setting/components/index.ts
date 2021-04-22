import { createAsyncComponent } from '/@/utils/factory/asyncComponents';
export const LoyoutTypePicker = createAsyncComponent(() => import('./LayoutTypePicker.vue'));
export const AppTheme = createAsyncComponent(() => import('./AppTheme.vue'));
export const ThemePicker = createAsyncComponent(() => import('./ThemePicker.vue'));
export const SwitchItem = createAsyncComponent(() => import('./SwitchItem.vue'));
