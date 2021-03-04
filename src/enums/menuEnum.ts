/**
 * @description: menu type
 */
export enum MenuTypeEnum {
  // 左侧菜单模式
  SIDEBAR = 'sidebar',
  // 左侧菜单混合模式
  MIX_SIDEBAR = 'mix-sidebar',
  // 顶部菜单混合模式
  MIX = 'mix',
  // 顶部菜单模式
  TOP_MENU = 'top-menu',
}

// menu mode
export enum MenuModeEnum {
  VERTICAL = 'vertical',//垂直
  HORIZONTAL = 'horizontal',//水平
  VERTICAL_RIGHT = 'vertical-right',//垂直右侧
  INLINE = 'inline',//嵌入
}
