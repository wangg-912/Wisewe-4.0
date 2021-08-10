/* eslint-disable */
import type { DefineComponent } from 'vue';

declare module '*.vue' {
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
declare module 'jQuery';
declare let $: any;
declare let jQuery: any;

declare module 'mockjs';
