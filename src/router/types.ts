
import { defineComponent } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

export type Component<T extends any = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);

export interface IMenuMeta {
  icon: string;
  title: string;
  affix?: boolean;
  frameSrc?: string;
  frameOpenType?: string;
  activeMenu?: string;
  noCache?: boolean;
  hidden?: boolean;
  hideTag?: boolean;
  hideMenu?: boolean;
}
export interface IMenubarList {
  id?: number | string;
  name?: string;
  path: string;
  fullPath: string;
  redirect?: string | { name: string };
  meta?: Partial<IMenuMeta>;
  component?: Component;
  children?: Array<IMenubarList>;
}


export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string;
  meta: IMenuMeta;
  component?: Component | string;
  children?: AppRouteRecordRaw[];
  props?: Recordable;
  fullPath?: string;
}

export type AppRouteModule = AppRouteRecordRaw;
