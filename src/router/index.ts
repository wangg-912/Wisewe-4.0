import type { App } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';
import { scrollBehavior } from './scrollBehavior';
import { IMenubarList } from './types';

const components: IObject<() => Promise<typeof import('*.vue')>> = {
  Layout: ((() => import('/@/layout/index.vue')) as unknown) as () => Promise<
    typeof import('*.vue')
  >,
  Home: ((() => import('/@/components/home/index.vue')) as unknown) as () => Promise<
    typeof import('*.vue')
  >,
  404: ((() => import('/@/views/error/404.vue')) as unknown) as () => Promise<
    typeof import('*.vue')
  >,
};

// 静态路由页面
export const allowRouter: Array<IMenubarList> = [
  {
    name: '',
    path: '/',
    component: components['Layout'],
    redirect: '/home',
    meta: { title: '首页', icon: 'el-icon-s-home' },
    children: [
      {
        path: '/home',
        name: 'home',
        component: components['Home'],
        meta: { title: '首页', icon: 'el-icon-home' },
      },
    ],
  },
  {
    name: '404',
    path: '/404',
    meta: { title: '错误页面', hidden: true, icon: 'el-icon-eleme' },
    component: components['Layout'],
    redirect: '/error/404',
    children: [
      {
        name: 'error/404',
        path: '/error/404',
        component: components['404'],
        meta: { title: '404', icon: 'el-icon-s-tools' },
      },
    ],
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

const router = createRouter({
  history: createWebHashHistory(), // createWebHistory
  routes: (allowRouter as unknown) as RouteRecordRaw[],
  scrollBehavior: scrollBehavior,
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}

export default router;