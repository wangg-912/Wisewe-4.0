import type { ProjectConfig } from '/@/types/config'; //系统配置接口
import { ContentEnum, ThemeEnum, RouterTransitionEnum } from '/@/enums/appEnum'; // app 枚举

const setting: ProjectConfig = {
  // 网站为灰色模式
  grayMode: false,
  // 颜色弱点模式
  colorWeak: false,
  // 是否取消菜单，顶部，多选项卡页面显示，以便可能嵌入其他系统
  fullContent: false,
  // 主窗体模式
  contentMode: ContentEnum.FULL,
  // 是否显示Logo
  showLogo: true,
  // 头部配置
  headerSetting: {
    // 头部背景颜色
    bgColor: '#ffffff',
    // 是否固定头部
    fixed: true,
    // 是否显示会都顶部
    show: true,
    // 主题
    theme: ThemeEnum.LIGHT,
    // 是否显示全屏按钮
    showFullScreen: true,
    // 是否显示通知
    showNotice: true,
    // 显示菜单搜索
    showSearch: true,
  },
  // 菜单配置
  menuSetting: {
    // 侧边栏菜单背景颜色
    bgColor: '#001529',
    // 是否固定左侧菜单
    fixed: true,
    // 菜单合并状态
    collapsed: false,
    // Whether to display the menu name when folding the menu
    collapsedShowTitle: false,
  }
};

export default setting;
