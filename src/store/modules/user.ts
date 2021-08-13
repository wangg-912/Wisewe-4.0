import store from '/@/store/index';
import { VuexModule, Module, getModule, Mutation, Action } from 'vuex-module-decorators';
import { hotModuleUnregisterModule } from '/@/utils/helper/vuexHelper';
import {
  PageEnum,
  GetUserInfoByUserIdModel,
  GetUserInfoByUserIdParams,
  RoleEnum,
} from '/@/enums/appEnum';
import { CacheTypeEnum, ROLES_KEY, USER_INFO_KEY } from '/@/enums/cacheEnum';
import router from '/@/router';
import { setLocal, getLocal, getSession, setSession } from '/@/utils/helper/persistent';
import { useProjectSetting } from '/@/hooks/setting';
import { getWorkVo } from '/@/api/app';

export type UserInfo = Omit<GetUserInfoByUserIdModel, 'roles'>;
const NAME = 'user';
hotModuleUnregisterModule(NAME);

const { permissionCacheType } = useProjectSetting();

function getCache<T>(key: string) {
  const fn = permissionCacheType === CacheTypeEnum.LOCAL ? getLocal : getSession;
  return fn(key) as T;
}

function setCache(USER_INFO_KEY: string, info: any) {
  if (!info) return;
  // const fn = permissionCacheType === CacheTypeEnum.LOCAL ? setLocal : setSession;
  setLocal(USER_INFO_KEY, info, true);
  setSession(USER_INFO_KEY, info, true);
}
@Module({ namespaced: true, name: NAME, dynamic: true, store })
class User extends VuexModule {
  // user info
  private userInfoState: UserInfo | null = null;
  // roleList
  private roleListState: RoleEnum[] = [];
  /**
   * @description 获取用户信息
   */
  get getUserInfoState(): UserInfo {
    return this.userInfoState || getCache<UserInfo>(USER_INFO_KEY) || {};
  }
  /**
   * @description 获取角色列表状态
   */
  get getRoleListState(): RoleEnum[] {
    return this.roleListState.length > 0 ? this.roleListState : getCache<RoleEnum[]>(ROLES_KEY);
  }

  @Mutation
  COMMITRESETSTATE(): void {
    this.userInfoState = null;
    this.roleListState = [];
  }
  @Mutation
  COMMITUSERINFO(info: UserInfo): void {
    this.userInfoState = info;
    setCache(USER_INFO_KEY, info);
  }

  @Mutation
  COMMITROSELIST(roleList: RoleEnum[]): void {
    this.roleListState = roleList;
    setCache(ROLES_KEY, roleList);
  }
  /**
   * @description 获取系统权限
   * @returns
   */
  @Action
  async getAppPermission(): Promise<unknown> {
    try {
      const { data } = await getWorkVo();
      const { roles, user } = data.content;
      const roleList = roles.map((item) => item.code) as RoleEnum[];
      const userInfo: UserInfo = {
        roles,
        code: user.code,
        email: user.email,
        userId: user.id,
        initialPsd: user.initialPsd,
        name: user.name,
        tel: user.tel,
      };
      this.COMMITUSERINFO(userInfo);
      this.COMMITROSELIST(roleList);
      await router.replace(PageEnum.BASE_HOME);
      return userInfo;
    } catch (error) {
      return null;
    }
  }
}
export const userStore = getModule<User>(User);
