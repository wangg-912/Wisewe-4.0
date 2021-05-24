import { IMenubarList } from '/@/utils/types';
import { transPinYin } from '/@/utils/pinyin';
import { routeStore } from '/@/store/modules/route';
import { asyncRouterMap } from '/@/router'
// 引入动态路由页面
const components: IObject<() => Promise<typeof import('*.vue')>> = {
  Layout: ((() => import('/@/layout/index.vue')) as unknown) as () => Promise<
    typeof import('*.vue')
  >,
  PagePanel: ((() => import('/@/layout/page/pagePanel.vue')) as unknown) as () => Promise<
    typeof import('*.vue')
  >,
  404: ((() => import('/@/views/error/404.vue')) as unknown) as () => Promise<
    typeof import('*.vue')
  >,
};
export function transformDateByRoute(data: any, level = 'root') {
  const d: Array<IMenubarList> = [];
  data.forEach((val) => {
    const { text, iconCls, children, leaf, attributes } = val;
    const obj = {
      name: transPinYin(text),
      path: level == 'root' ? `/${transPinYin(text, 'lower')}` : `${transPinYin(text, 'lower')}`,
      meta: {
        icon: iconCls,
        title: text,
        noCache: false,
        hidden: false,
      },
    };
    if(!leaf){
      obj.component = level == 'root' ? components['Layout'] :  components['PagePanel'];
    }else{
      if (attributes && attributes.url && attributes.url.indexOf('html') > -1) {
        obj.meta.frameSrc = attributes.url;
        obj.component = components['PagePanel'];
      } else {
        obj.component = ((() => import(`${attributes.url}`)) as unknown) as () => Promise<
          typeof import('*.vue')
        >;
      }
    }
    if (children && children.length) {
      obj.children = transformDateByRoute(children, 'parent');
    }
    d.push(obj);
  });
  return d;
}
export function generatorDynamicRouter(data: any): Promise<unknown> {
  return new Promise((resolve) => {
    const routerList: Array<IMenubarList> = transformDateByRoute(data);
    const finallyRoutes = [...routerList, ...asyncRouterMap];
    resolve(finallyRoutes);
  })
}
