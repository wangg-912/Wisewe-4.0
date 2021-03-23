import type { ProjectConfig } from '/@/type/config';
import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators';
import store from '/@/store';
import { PROJ_CFG_KEY } from '/@/enums/cacheEnum';
const NAME = 'app';

@Module({ dynamic: true, namespaced: true, store, name: NAME })
class App extends VuexModule {
  // 菜单伸缩状态
  private collapse = false;
  private count = 0;
  private status = false;
  // 页面配置
  private pageLoadingState = false;
  // 项目配置
  private projectConfigState: ProjectConfig | null;
  get isCollapse() {
    return this.collapse;
  }
  get getCount() {
    return this.count;
  }
  get getStatus() {
    return this.status;
  }
  /**
   * @description 获取页面加载状态
   */
  get getPageLoading() {
    return this.pageLoadingState;
  }
  /**
   *  @description 获取页面配置
   */
  get getProjectConfig(): ProjectConfig {
    return this.projectConfigState || ({} as ProjectConfig);
  }
  /**
   * 设置伸缩
   * @param collapase {Boolean}
   */
  @Mutation
  SETCOLLAPSE(collapse: boolean): void {
    this.collapse = collapse;
  }

  @Mutation
  SETCOUNT(count: number): void {
    this.count = count;
  }
  @Mutation
  UPDATESTATE(status: boolean): void {
    this.status = status;
  }
  /**
   * 设置伸缩动作
   * @param collapse
   */
  @Action
  public setCollapse(collapse: boolean): void {
    this.SETCOLLAPSE(collapse);
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
