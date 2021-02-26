import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators';
import store from '/@/store';

const NAME = 'app';

@Module({ dynamic: true, namespaced: true, store, name: NAME })
class App extends VuexModule {
  private count = 0;
  private status = false;

  get getCount() {
    return this.count;
  }
  get getStatus() {
    return this.status;
  }
  @Mutation
  SETCOUNT(count: number): void {
    this.count = count;
  }
  @Mutation
  UPDATESTATE(status: boolean): void {
    this.status = status;
  }

  @Action
  public setCount(count: number): void {
    this.SETCOUNT(count);
  }
  @Action
  public updateState(status: boolean): void {
    this.UPDATESTATE(status);
  }
}

export const appStore = getModule<App>(App)
