import { InjectionKey, Ref } from 'vue';
import { createContext, useContext } from '/@/hooks/core/useContext';

export interface AppProviderContextProps {
  prefixCls: Ref<string>;
  isMobile: Ref<boolean>;
}

const key: InjectionKey<AppProviderContextProps> = Symbol();
/**
 * @description 创建App注入上下文
 * @param context
 * @returns
 */
export function createAppProviderContext(context: AppProviderContextProps) {
  return createContext<AppProviderContextProps>(context, key);
}
/**
 * @description 上下文注入钩子函数
 * @returns
 */
export function useAppProviderContext() {
  return useContext<AppProviderContextProps>(key);
}
