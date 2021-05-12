import type { Router, RouteRecordRaw } from 'vue-router';
import { PageEnum } from '/@/enums/appEnum';
import { routeStore } from '/@/store/modules/route';
import { PAGE_NOT_FOUND_ROUTE } from '/@/router/constant';

const whitePathList: PageEnum[] = [PageEnum.BASE_HOME];

export function createPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    //debugger;
    if (to.name === PAGE_NOT_FOUND_ROUTE.name) {
      next(PageEnum.ERROR_PAGE);
      return;
    } else {
      if (routeStore.isAddRouters) {
        next();
        return;
      }
      routeStore.GenerateRoutes().then(() => {
        routeStore.addRouters.forEach(async (route: RouteRecordRaw) => {
          await router.addRoute(route.name!, route); // 动态添加可访问路由表
        });
        const redirectPath = (from.query.redirect || to.path) as string;
        const redirect = decodeURIComponent(redirectPath);
        const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect };
        routeStore.setIsAddRouters(true);
        next(nextData);
      });
    }
  });
}
