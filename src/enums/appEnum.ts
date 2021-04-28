// 容器枚举
export enum ContentEnum {
  // auto width
  FULL = 'full',
  // fixed width
  FIXED = 'fixed',
}
// 应用主题模式枚举
export enum ThemeModeEnum {
  LIGHT = 'light-mode',
  DARK = 'dark-mode',
  SEMI_DARK = 'semi-dark-mode',
}

// 菜单主题枚举
export enum ThemeEnum {
  DARK = 'dark',
  LIGHT = 'light',
}

//路由动画枚举
export enum RouterTransitionEnum {
  ZOOM_CENTER = 'el-zoom-in-center',
  ZOOM_TOP = 'el-zoom-in-top',
  ZOOM_BOTTOM = 'el-zoom-in-bottom',
  FADE_SIDE = 'el-fade-in-linear',
  FADE = 'el-fade-in',
}
// 配置按钮显示位置
export enum SettingButtonPositionEnum {
  AUTO = 'auto',
  HEADER = 'header',
  FIXED = 'fixed',
}
// 页面配置
export enum PageEnum {
  BASE_HOME = '/home', // 默认页面path
  ERROR_PAGE = '/exception', //错误页面path
}
