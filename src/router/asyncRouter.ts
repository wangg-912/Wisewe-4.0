
import { RouteRecordRaw } from 'vue-router'
import { routeStore } from '/@/store/modules/route';
import { IMenubarList } from './types';
import { transPinYin } from '/@/utils/pinyin'
import router from '/@/router';


/* import { store } from '/@/store/index' */
// 引入动态路由页面
const components: IObject<() => Promise<typeof import('*.vue')>> = {
  Layout: ((() => import('/@/layout/index.vue')) as unknown) as () => Promise<
    typeof import('*.vue')
  >,
  PagePanel: ((() => import('/@/layout/page.pagePanel.vue')) as unknown) as () => Promise<
    typeof import('*.vue')
  >,
  404: ((() => import('/@/views/error/404.vue')) as unknown) as () => Promise<
    typeof import('*.vue')
  >,
};
/**
 * list结构转tree
 * @param data list原始数据
 * @param pid 最外层pid
 */

/* id?: number | string;
   name?: string;
   path: string;
   meta?: {
     icon: string;
     title: string;
     frameSrc?: string;
     activeMenu?: string;
     noCache?: boolean;
     hidden?: boolean;
   };
   component?: (() => Promise<typeof import('*.vue')>) | string;
   children?: Array<IMenubarList>; */


export function listToTree(data: Array<IMenubarList>, fullPath = '/'): Array<IMenubarList> {
  const d: Array<IMenubarList> = [];
  data.forEach(val => {
    const { id, text, iconCls, children, attributes } = val;
    /* console.log(transPinYin(text)) */
    let obj = {
      id,
      name: transPinYin(text),
      fullPath: `${fullPath}${transPinYin(text)}`,
      path: `/${transPinYin(text)}`,
      meta: {
        icon: iconCls,
        title: text,
        noCache: false,
        hidden: false,
      }
    };
    let isFrame = attributes && attributes.url && attributes.url.indexOf('html') > -1;
    if (isFrame) {
      obj.meta.frameSrc = attributes.url;
      obj.component = components['PagePanel'];
    }else{
      obj.component = ((() => import(`${attributes.url}`)) as unknown) as () => Promise<typeof import('*.vue')>
    }
    if (val.children && val.children.length) {
      obj.children = listToTree(val.children, `${fullPath}${transPinYin(text)}/`);
    }
    d.push(obj);
  })
  return d;
}
const asyncRouter: Array<IMenubarList> = [{ path: '/:pathMatch(.*)*', redirect: '/' }];

export const generatorDynamicRouter = (data: Array<IMenubarList>): void => {
  const routerList: Array<IMenubarList> = listToTree(data);
  const finallyRoutes = [...routerList, ...asyncRouter];
  finallyRoutes.forEach((item) => {
    router.addRoute('Layout', item as RouteRecordRaw);
  })
  routeStore.setRoutes(finallyRoutes);
  /* router.addRoutes(finallyRoutes); */
};
