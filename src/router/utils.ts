import { IMenubarList } from '/@/utils/types';
import { transPinYin } from '/@/utils/pinyin';
import { routeStore } from '/@/store/modules/route';
import { asyncRouterMap } from '/@/router';
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

function getContextPath(parentPath: string, parent: any, children: any) {
  //debugger;
  children.forEach((item, index) => {
    if (index === 0) {
      parent.redirect = `${parentPath}/${transPinYin(item.text, 'lower')}`;
    }
  });
}
export function transformDateByRoute(data: any, basePath = '/', level = 'root') {
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
        leaf,
      },
    };
    if (!leaf) {
      obj.component = level == 'root' ? components['Layout'] : components['PagePanel'];
    } else {
      if (attributes && attributes.url && attributes.url.indexOf('html') > -1) {
        obj.meta.frameSrc = attributes.url;
        obj.meta.frameOpenType = attributes.openType;
        obj.component = components['PagePanel'];
      } else {
        obj.component = () => import(`${attributes.url}.vue`);
      }
    }
    if (children && children.length) {
      let bPath =
        level == 'root'
          ? `/${transPinYin(text, 'lower')}`
          : `${basePath}/${transPinYin(text, 'lower')}`;
      getContextPath(bPath, obj, children);
      obj.children = transformDateByRoute(children, bPath, 'parent');
    }
    d.push(obj);
  });
  return d;
}
export function generatorDynamicRouter(data: any): Promise<unknown> {
  return new Promise((resolve) => {
    const routerList: Array<IMenubarList> = transformDateByRoute(data);
    /* console.log(routerList); */
    const finallyRoutes = [...routerList, ...asyncRouterMap];
    resolve(finallyRoutes);
  });
}
