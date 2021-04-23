import type { IMenubarList } from '/@/router/types';
import ParentLayout from '/@/layout/page/pagePanel.vue';

export const LAYOUT = () => import('/@/layout/index.vue');
const EXCEPTION_COMPONENT = () => import('/@/views/error/404.vue');

/**
 * @description: page-layout
 */
 export const getParentLayout = (name: string) => {
  return () =>
    new Promise((resolve) => {
      resolve({
        ...ParentLayout,
        name,
      });
    });
};

// 404 on a page
export const PAGE_NOT_FOUND_ROUTE: IMenubarList = {
  path: '/:path(.*)*',
  name: 'ErrorPage',
  component: LAYOUT,
  meta: {
    title: 'ErrorPage',
    hideBreadcrumb: true,
  },
  children: [
    {
      path: '/:path(.*)*',
      name: 'ErrorPage',
      component: EXCEPTION_COMPONENT,
      meta: {
        title: 'ErrorPage',
        hideBreadcrumb: true,
      },
    },
  ],
};

export const REDIRECT_NAME = 'Redirect';
export const REDIRECT_ROUTE: IMenubarList = {
  path: '/redirect',
  name: REDIRECT_NAME,
  component: LAYOUT,
  meta: {
    title: REDIRECT_NAME,
    hideBreadcrumb: true,
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: REDIRECT_NAME,
      component: () => import('/@/views/system/redirect.vue'),
      meta: {
        title: REDIRECT_NAME,
        hideBreadcrumb: true,
      },
    },
  ],
};
