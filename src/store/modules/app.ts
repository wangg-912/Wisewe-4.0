import type { ProjectConfig } from '/@/type/config';
import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators';
import store from '/@/store';
import { PROJ_CFG_KEY } from '/@/enums/cacheEnum';
import { setLocal } from '/@/utils/helper/persistent';
import { deepMerge } from '/@/utils/tools';
const NAME = 'app';
let timeId: TimeoutHandle;

@Module({ dynamic: true, namespaced: true, store, name: NAME })
class App extends VuexModule {

  private count = 0;
  private status = false;
  // 页面配置
  private pageLoadingState = false;
  // 项目配置
  private projectConfigState: ProjectConfig | null;



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
   * 设置页面加载状态
   * @param loading
   */
  @Mutation
  SETPAGELOADINGSTATE(loading: boolean): void {
    this.pageLoadingState = loading;
  }

  @Mutation
  COMMITPROJECTCONFIGSTATE(proCfg: DeepPartial<ProjectConfig>): void {
    this.projectConfigState = deepMerge(this.projectConfigState || {}, proCfg);
    setLocal(PROJ_CFG_KEY, this.projectConfigState);
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
   *  设置页面加载状态动作
   * @param loading
   */
  @Action
  public async setPageLoadingAction(loading: boolean): Promise<void> {
    if (loading) {
      clearTimeout(timeId);
      // Prevent flicker
      timeId = setTimeout(() => {
        this.SETPAGELOADINGSTATE(loading);
      }, 50);
    } else {
      this.SETPAGELOADINGSTATE(loading);
      clearTimeout(timeId);
    }
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
