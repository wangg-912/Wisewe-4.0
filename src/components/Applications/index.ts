import { createAsyncComponent } from '/@/utils/factory/asyncComponents';
import AppLogo from './src/AppLogo/index.vue';
import AppProvider from './src/AppProvider/index.vue';
export const AppSearch = createAsyncComponent(() => import('./src/search/AppSearch.vue'));

export { useAppProviderContext } from './src/useAppContext';
export { AppLogo, AppProvider };
