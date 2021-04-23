import { RouterTransitionEnum, ThemeEnum } from '/@/enums/appEnum';
/**
 *
 */
export interface MenuSetting {
  bgColor: string;
  fixed: boolean;
  collapsed: boolean;
  showLogoTitle: boolean;
  menuWidth: number;
  mode: string;
  type: string;
  theme: string;
  topMenuAlign: string;
  trigger: string;
}
/**
 *
 */
export interface MultiTabsSetting {}
export interface HeaderSetting {
  bgColor: string;
  fixed: boolean;
  show: boolean;
  theme: ThemeEnum;
  // 显示全屏按钮
  showFullScreen: boolean;
  // 开启全屏功能
  useLockPage: boolean;
  // 显示消息中心按钮
  showNotice: boolean;

  showSearch: boolean;
}

/**
 * @description 动画接口
 */
export interface TransitionSetting {
  // 是否打开页面切换动画
  enable: boolean;
  // 路由切换动画
  basicTransition: RouterTransitionEnum;
  // 是否打开页面切换加载
  openPageLoading: boolean;
  // 是否打开顶部进度条
  openNProgress: boolean;
}

/**
 * @description 项目配置接口
 */
export interface ProjectConfig {
  // 是否显示配置按钮
  showSettingButton: boolean;
  // 网站灰色模式，用于可能悼念的日期开启
  grayMode: boolean;
  // 是否开启色弱模式
  colorWeak: boolean;
  // 主题色
  themeColor: string;
  /*  themeMode: ThemeMode; */
  // 全屏显示主界面,不显示菜单,及顶部
  fullContent: boolean;
  // 是否显示logo
  showLogo: boolean;
  showFooter: boolean;
  headerSetting: HeaderSetting;
  // 菜单类型
  // menuType: MenuTypeEnum;
  menuSetting: MenuSetting;
  // pageLayout是否开启keep-alive
  openKeepAlive: boolean;
  // 显示面包屑
  showBreadCrumb: boolean;
  // 显示面包屑图标
  showBreadCrumbIcon: boolean;
  // 使用error-handler-plugin
  useErrorHandle: boolean;
  // 是否开启回到顶部
  useOpenBackTop: boolean;
  // 是否可以嵌入iframe页面
  canEmbedIFramePage: boolean;
  // 切换界面的时候是否删除未关闭的message及notify
  closeMessageOnSwitch: boolean;
  // 切换界面的时候是否取消已经发送但是未响应的http请求。
  removeAllHttpPending: boolean;
}
interface ProjectSettingWrap {
  projectSetting: Readonly<ProjectConfig>;
}

export interface GlobConfig {
  // 网站标题
  title: string;
  // 项目路径
  apiUrl: string;
  uploadUrl?: string;
  urlPrefix?: string;
  shortName: string;
}
export interface GlobEnvConfig {
  // 网站标题
  VITE_GLOB_APP_TITLE: string;
  // 项目路径
  VITE_GLOB_API_URL: string;
  VITE_GLOB_API_URL_PREFIX?: string;
  VITE_GLOB_APP_SHORT_NAME: string;
  VITE_GLOB_UPLOAD_URL?: string;
}
