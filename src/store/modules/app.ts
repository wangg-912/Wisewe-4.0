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
  // 页面配置
  private pageLoadingState = false;
  // 项目配置
  private projectConfigState: ProjectConfig | null;
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
   * @param {Boolean} loading
   */
  @Mutation
  SETPAGELOADINGSTATE(loading: boolean): void {
    this.pageLoadingState = loading;
  }
  /**
   * @description 变更框架配置
   * @param { ProjectConfig } proCfg
   */
  @Mutation
  COMMITPROJECTCONFIGSTATE(proCfg: DeepPartial<ProjectConfig>): void {
    this.projectConfigState = deepMerge(this.projectConfigState || {}, proCfg);
    setLocal(PROJ_CFG_KEY, this.projectConfigState);
  }
  /**
   *  设置页面加载状态动作
   * @param {Boolean} loading
   */
  @Action
  public async setPageLoadingAction(loading: boolean): Promise<void> {
    if (loading) {
      clearTimeout(timeId);
      timeId = setTimeout(() => {
        this.SETPAGELOADINGSTATE(loading);
      }, 0);
    } else {
      this.SETPAGELOADINGSTATE(loading);
      clearTimeout(timeId);
    }
  }
}

export const appStore = getModule<App>(App);
