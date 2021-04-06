import type { VNodeChild, ComputedRef } from 'vue';
export interface DrawerInstance {
  setDrawerProps: (props: Partial<DrawerProps> | boolean) => void;
  emitVisible?: (visible: boolean, uid: number) => void;
}

export type RegisterFn = (drawerInstance: DrawerInstance, uuid?: string) => void;

export interface ReturnMethods extends DrawerInstance {
  openDrawer: <T = any>(visible?: boolean, data?: T, openOnSet?: boolean) => void;
  getVisible?: ComputedRef<boolean>;
}
export interface ReturnInnerMethods extends DrawerInstance {
  closeDrawer: () => void;
  changeLoading: (loading: boolean) => void;
  changeOkLoading: (loading: boolean) => void;
  getVisible?: ComputedRef<boolean>;
}

export type UseDrawerReturnType = [RegisterFn, ReturnMethods];

export type UseDrawerInnerReturnType = [RegisterFn, ReturnInnerMethods];

export interface DrawerProps {
  visible?: boolean;
  closeFunc?: () => Promise<any>;
  showClose?: boolean;
  destroyOnClose?: boolean;
  modal?: boolean;
  title?: VNodeChild | JSX.Element;
  closeOnPressEscape?: boolean;
  direction?: 'rtl' | 'ltr' | 'ttb' | 'btt';
  size?: string;
  handleClose?: (e?: Event) => void;
}
