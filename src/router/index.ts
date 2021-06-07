import type { App } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';
import { createGuard } from './guard/';
import { scrollBehavior } from './scrollBehavior';
import { IMenubarList, AppRouteRecordRaw } from './types';

const components: IObject<() => Promise<typeof import('*.vue')>> = {
  Layout: ((() => import('/@/layout/index.vue')) as unknown) as () => Promise<
    typeof import('*.vue')
  >,
  PagePanel: ((() => import('/@/layout/page/pagePanel.vue')) as unknown) as () => Promise<
    typeof import('*.vue')
  >,
  Home: ((() => import('/@/components/home/index.vue')) as unknown) as () => Promise<
    typeof import('*.vue')
  >,
  Redirect: ((() => import('/@/views/system/redirect.vue')) as unknown) as () => Promise<
    typeof import('*.vue')
  >,
  404: ((() => import('/@/views/error/404.vue')) as unknown) as () => Promise<
    typeof import('*.vue')
  >,
};

// 静态路由页面
export const constantRouterMap: Array<IMenubarList> = [
  {
    path: '/redirect',
    component: components['Layout'],
    children: [
      {
        path: '/redirect/:path*',
        component: components['Redirect'],
        meta: {
          title: 'Redirect',
        },
      },
    ],
    meta: {
      hidden: true,
    },
  },
  {
    path: '/404',
    component: components['Layout'],
    name: 'PageError',
    redirect: '/404/noFind',
    meta: {
      hidden: true,
      title: '404',
      hideTag: true,
    },
    children: [
      {
        path: 'noFind',
        component: components['404'],
        name: 'NoFind',
        meta: {},
      },
    ]
  },
  {
    path: '/',
    name: 'Root',
    redirect: '/home',
    component: components['Layout'],
    meta: {
      title: '工作台',
      icon: 'el-icon-s-home',
    },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: components['Home'],
        meta: {
          title: '统计分析',
          icon: 'el-icon-s-home',
          noCache: true,
          affix: true,
        },
      },
    ],
  },
];

export const asyncRouterMap: AppRouteRecordRaw[] = [];

const router = createRouter({
  history: createWebHashHistory(), // createWebHistory
  routes: (constantRouterMap as unknown) as RouteRecordRaw[],
  strict: true,
  scrollBehavior: scrollBehavior,
});
export function resetRouter(): void {
  const resetWhiteNameList = ['RedirectRoot', 'Redirect', 'Root', 'Home', 'Page404'];
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !resetWhiteNameList.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}
export function setupRouter(app: App<Element>) {
  app.use(router);
  createGuard(router);
}
export default router;
