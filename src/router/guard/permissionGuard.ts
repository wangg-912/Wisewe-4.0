import type { Router } from 'vue-router';
import { PageEnum } from '/@/enums/appEnum';
import { PAGE_NOT_FOUND_ROUTE } from '/@/router/constant';

const BASE_PATH = PageEnum.BASE_HOME;

const whitePathList: PageEnum[] = [BASE_PATH];

export function createPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    if (to.name === PAGE_NOT_FOUND_ROUTE.name) {
      next(PageEnum.ERROR_PAGE);
      return;
    }
    if (whitePathList.includes(to.path as PageEnum)) {
      next();
      return;
    }
    /* const redirectPath = (from.query.redirect || to.path) as string;
    const redirect = decodeURIComponent(redirectPath);
    const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }; */
    next();
  });
}
