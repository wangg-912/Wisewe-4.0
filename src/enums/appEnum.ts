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
  ZOOM_FADE = 'zoom-fade',
  ZOOM_OUT = 'zoom-out',
  FADE_SIDE = 'fade-slide',
  FADE = 'fade',
  FADE_BOTTOM = 'fade-bottom',
  FADE_SCALE = 'fade-scale',
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
