import store from '/@/store/index';
import { VuexModule, Module, getModule, Mutation, Action } from 'vuex-module-decorators';
import { hotModuleUnregisterModule } from '/@/utils/helper/vuexHelper';
import {
  PageEnum,
  GetUserInfoByUserIdModel,
  GetUserId,
  GetUserPermission,
  RoleEnum,
} from '/@/enums/appEnum';
import {
  CacheTypeEnum,
  ROLES_KEY,
  USER_INFO_KEY,
  USER_ID_KEY,
  USER_PERMISSION_KEY,
} from '/@/enums/cacheEnum';
import router from '/@/router';
import { setLocal, getLocal, getSession, setSession } from '/@/utils/helper/persistent';
import { useProjectSetting } from '/@/hooks/setting';
import { getWorkVo } from '/@/api/app';

export type UserInfo = Omit<GetUserInfoByUserIdModel, 'roles'>;
export type UserId = Omit<GetUserId, 'userId'>;
export type UserPermission = Omit<GetUserPermission, 'permissions'>;

const NAME = 'user';
hotModuleUnregisterModule(NAME);

const { permissionCacheType } = useProjectSetting();

function getCache<T>(key: string) {
  const fn = permissionCacheType === CacheTypeEnum.LOCAL ? getLocal : getSession;
  return fn(key) as T;
}
/**
 * @description 设置缓存机制
 * @param KEY 缓存主键
 * @param value 缓存值
 * @returns
 */

function setCache(KEY: string, value: any) {
  if (!value) return;
  const fn = permissionCacheType === CacheTypeEnum.LOCAL ? setLocal : setSession;
  fn(KEY, value, true);
}
@Module({ namespaced: true, name: NAME, dynamic: true, store })
class User extends VuexModule {
  // user info
  private userInfoState: UserInfo | null = null;
  // user id
  private userId: UserId | null = null;
  //user permiss
  private userPermission: UserPermission | null = null;
  // roleList
  private roleListState: RoleEnum[] = [];
  /**
   * @description 获取用户信息
   */
  get getUserInfoState(): UserInfo {
    return this.userInfoState || getCache<UserInfo>(USER_INFO_KEY) || {};
  }
  /**
   * @description 获取用户ID
   */
  get getUserId(): UserId {
    return this.userId || getCache<UserId>(USER_ID_KEY) || {};
  }
  /**
   * @description 获取用户权限
   */
  get getUserPermission(): UserPermission {
    return this.userPermission || getCache<UserInfo>(USER_PERMISSION_KEY) || {};
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
  COMMITUSERID(id: UserId): void {
    this.userId = id;
    setCache(USER_ID_KEY, id);
  }
  @Mutation
  COMMITUSERPERMISSION(permission: UserPermission): void {
    this.userPermission = permission;
    setCache(USER_PERMISSION_KEY, permission);
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
      //console.log(await getWorkVo());
      const { roles, user, info, permissions } = await getWorkVo();
      const roleList = roles.map((item: any) => item.code) as RoleEnum[];
      const userInfo: UserInfo = {
        roles,
        code: user.code,
        email: user.email,
        userId: user.id,
        initialPsd: user.initialPsd,
        name: user.name,
        tel: user.tel,
        info,
      };
      this.COMMITUSERINFO(userInfo);
      this.COMMITUSERID(user.id);
      this.COMMITUSERPERMISSION(permissions);
      this.COMMITROSELIST(roleList);
      await router.replace(PageEnum.BASE_HOME);
      return userInfo;
    } catch (error) {
      return null;
    }
  }
}
export const userStore = getModule<User>(User);
