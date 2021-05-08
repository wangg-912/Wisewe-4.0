import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators';
import store from '/@/store';
import { IMenubarList } from '/@/router/types';
const NAME = 'route';

@Module({ dynamic: true, namespaced: true, store, name: NAME })
class App extends VuexModule {
  //路由
  private routes: IMenubarList = [];
  get getRoutes() {
    return this.routes;
  }

  @Mutation
  SETROUTES(routes: IMenubarList): void {
    this.routes = routes;
  }

  @Action
  public async setRoutes(routes: Array<IMenubarList>): Promise<unknown> {
    return new Promise((resolve) => {
      this.SETROUTES(routes);
      resolve({});
    });
  }
}

export const routeStore = getModule<App>(App);
