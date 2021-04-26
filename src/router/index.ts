import type { App } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';
import { createGuard } from './guard/';
import { scrollBehavior } from './scrollBehavior';
import { IMenubarList } from './types';

const components: IObject<() => Promise<typeof import('*.vue')>> = {
  Layout: ((() => import('/@/layout/index.vue')) as unknown) as () => Promise<
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
export const allowRouter: Array<IMenubarList> = [
  {
    path: '/redirect',
    component: components['Layout'],
    children: [
      {
        path: '/redirect/:path*',
        component:components['Redirect'],
        meta: {}
      }
    ],
    meta: {
      hidden: true
    }
  },
  {
    path: '/exception',
    component: components['404'],
    name: 'exception',
    meta: {
      hidden: true,
      title: '404',
      hideTag:true, hideMenu:true
    }
  },
  {
    name: 'root',
    path: '/',
    component: components['Layout'],
    redirect: '/home',
    meta: { title: '首页', icon: 'el-icon-s-home' },
    children: [
      {
        path: '/home',
        name: 'home',
        component: components['Home'],
        meta: { title: '首页', icon: 'el-icon-home', affix: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(), // createWebHistory
  routes: (allowRouter as unknown) as RouteRecordRaw[],
  strict: true,
  scrollBehavior: scrollBehavior,
});

export function setupRouter(app: App<Element>) {
  app.use(router);
  createGuard(router);
}
export default router;
