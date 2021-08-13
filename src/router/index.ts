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
  Home: ((() => import('/@/views/dashboard/index.vue')) as unknown) as () => Promise<
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
    name: 'Redirect',
    component: components['Layout'],
    children: [
      {
        path: '/redirect/:path*',
        component: components['Redirect'],
        meta: {
          title: 'Redirect',
          hidden: true,
          hideTag: true,
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
    ],
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
          icon: 'el-icon-s-data',
          noCache: true,
          affix: true,
        },
      },
    ],
  },
];

export const asyncRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/components-demo',
    name: 'Components-Demo',
    redirect: '/components-demo/count-to',
    component: components['Layout'],
    meta: {
      title: '组件管理',
      icon: 'el-icon-box',
    },
    children: [
      {
        path: 'count-to',
        name: 'CountTo',
        component: () => import('/@/views/demo/countTo/index.vue'),
        meta: {
          title: '数字滚动组件',
          icon: 'el-icon-c-scale-to-original',
          noCache: true,
        },
      },
      {
        path: 'dialog',
        name: 'WDialog',
        component: () => import('/@/views/demo/dialog/index.vue'),
        meta: {
          title: '弹窗组件',
          icon: 'el-icon-s-data',
          noCache: true,
        },
      },
      {
        path: 'button',
        name: 'WButton',
        component: () => import('/@/views/demo/button/index.vue'),
        meta: {
          title: '按钮组件',
          icon: 'el-icon-s-data',
          noCache: true,
        },
      },
    ],
  },
];

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
