import type { AppRouteRecordRaw } from '/@/router/types';
import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators';
import { appStore } from '/@/store/modules/app';
import { userStore } from '/@/store/modules/user';
import store from '/@/store';
import { asyncRouterMap, constantRouterMap } from '/@/router'
import { IMenubarList } from '/@/router/types';
import { deepClone } from '/@/utils/tools';

import { resolve } from 'path';
const NAME = 'route';

@Module({ dynamic: true, namespaced: true, store, name: NAME })
class App extends VuexModule {
  //路由
  private routes: IMenubarList = [];
  public addRouters = [] as any[];
  public isAddRouters = false;
  get getRoutes() {
    return this.routes;
  }

  @Mutation
  private SETISADDROUTERS(state: boolean): void {
    this.isAddRouters = state;
  }
  @Mutation
  SETROUTES(routes: IMenubarList): void {
    this.addRouters = routes.concat([
      {
        path: '/:path(.*)*',
        redirect: '/404',
        name: '404',
        meta: {
          hidden: true,
        }
      }
    ])
   /*  this.routes = routes; */
    this.routes = deepClone(constantRouterMap, ['component']).concat(routes)
  }


  /* @Action
  public async setRoutes(routes: Array<IMenubarList>): Promise<unknown> {
    return new Promise((resolve) => {
      this.SETROUTES(routes);
      resolve({});
    });
  } */
  @Action
  public setIsAddRouters(state: boolean): void {
    this.SETISADDROUTERS(state)
  }
  @Action
  public GenerateRoutes(): Promise<unknown> {
    return new Promise((resolve) => {
      let routerMap: AppRouteRecordRaw[] = [];
      if (asyncRouterMap.length) {
        routerMap = generateRoutes(deepClone(asyncRouterMap, ['component']));
        //routerMap = [...asyncRouterMap];
      }
      this.SETROUTES(routerMap);
      resolve();
    })
  }
}

function generateRoutes(
  routes: AppRouteRecordRaw[],
  basePath = '/',
  isRoot = true
): AppRouteRecordRaw[] {
  const res: AppRouteRecordRaw[] = [];
  for (const route of routes) {
    if (route.meta && route.meta.hidden) {
      continue;
    }
    let data: any = null;
    data = Object.assign({}, route);
    if (route.children && data) {
      data.children = generateRoutes(route.children, resolve(basePath, data.path))
      /* const _path = isRoot ? data.path : `${basePath}/${data.path}`;
      console.log(_path,'333')
      data.children = generateRoutes(route.children, _path, false) */
    }
    if (data) {
      res.push(data as AppRouteRecordRaw)
    }
  }
  return res;
}

export const routeStore = getModule<App>(App);
