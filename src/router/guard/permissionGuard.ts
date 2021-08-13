import type { Router, RouteRecordRaw } from 'vue-router';
import { routeStore } from '/@/store/modules/route';
import { PageEnum } from '/@/enums/appEnum';
import { PAGE_NOT_FOUND_ROUTE } from '/@/router/constant';
const BASE_PATH = PageEnum.BASE_HOME;
const whitePathList: PageEnum[] = [BASE_PATH];
export function createPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    if (to.name === PAGE_NOT_FOUND_ROUTE.name) {
      next(BASE_PATH);
      return;
    }
    if (routeStore.isAddRouters || whitePathList.includes(to.path as PageEnum)) {
      next();
      return;
    } else {
      routeStore.GenerateRoutes().then(() => {
        routeStore.addRouters.forEach(async (route: RouteRecordRaw) => {
          await router.addRoute(route.name!, route); // 动态添加可访问路由表
        });
        //debugger;
        const redirectPath = (from.query.redirect || to.path) as string;
        const redirect = decodeURIComponent(redirectPath);
        const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect };
        routeStore.setIsAddRouters(true);
        next(nextData);
      });
    }
  });
}
