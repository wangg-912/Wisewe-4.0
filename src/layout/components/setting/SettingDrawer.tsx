import { defineComponent, computed, unref } from 'vue';
import { BasicDrawer } from '/@/components/Drawer/index';
import {
  APP_PRESET_COLOR_LIST,
  HEADER_PRESET_BG_COLOR_LIST,
  SIDE_BAR_BG_COLOR_LIST,
} from '/@/settings/designSetting';
import { useRootSetting } from '/@/hooks/setting/useRootSetting';
import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
import { useTagSetting } from '/@/hooks/setting/useTagSetting';
import { useTransitionSetting } from '/@/hooks/setting/useTransitionSetting';
import { LoyoutTypePicker, AppTheme, ThemePicker, SwitchItem } from './components';
import { baseHandler } from './handler';
import { HandlerEnum, menuTypeList } from './enums';
export default defineComponent({
  name: 'SettingDrawer',
  setup(_, { attrs }) {
    const {
      getContentMode,
      getShowBreadCrumb,
      getShowBreadCrumbIcon,
      getShowLogo,
      getFullContent,
      getColorWeak,
      getGrayMode,
      getThemeColor,
      getShowFooter,
      getWaterMark,
    } = useRootSetting();
    const {
      getShowHeader,
      getFixed: getHeaderFixed,
      getHeaderBgColor,
      getShowSearch,
    } = useHeaderSetting();

    const {
      getIsHorizontal,
      getMenuBgColor,
      getMenuType,
      getMenuFixed,
      getTopMenuAlign,
      getIsMixSidebar,
      getMixSideTrigger,
      getMixSideFixed,
    } = useMenuSetting();
    const { getTagsShow, getShowContextmenu, getShowQuick } = useTagSetting();
    const { getOpenNProgress, getOpenPageLoading } = useTransitionSetting();

    /**
     * @description 渲染系统主题
     * @returns {Element} ThemePicker
     */
    function renderLayoutPicker() {
      return (
        <>
          <LoyoutTypePicker
            typeList={menuTypeList}
            handler={(item: typeof menuTypeList[0]) => {
              baseHandler(HandlerEnum.CHANGE_LAYOUT, {
                mode: item.mode,
                type: item.type,
                split: unref(getIsHorizontal) ? false : undefined,
              });
            }}
            def={unref(getMenuType)}
          />
        </>
      );
    }
    /**
     * @description 渲染应用主题
     * @returns {Element} VNode AppTheme
     */
    function renderAppTheme() {
      return (
        <AppTheme
          colorList={APP_PRESET_COLOR_LIST}
          def={unref(getThemeColor)}
          event={HandlerEnum.CHANGE_THEME_COLOR}
        />
      );
    }
    /**
     * @description 渲染顶栏头部主题
     * @returns {Element} VNode ThemePicker
     */
    function renderHeaderTheme() {
      return (
        <ThemePicker
          colorList={HEADER_PRESET_BG_COLOR_LIST}
          def={unref(getHeaderBgColor)}
          event={HandlerEnum.HEADER_THEME}
        />
      );
    }
    /**
     * @description 渲染左栏菜单主题
     * @returns {Element} VNode ThemePicker
     */
    function renderSiderTheme() {
      return (
        <ThemePicker
          colorList={SIDE_BAR_BG_COLOR_LIST}
          def={unref(getMenuBgColor)}
          event={HandlerEnum.MENU_THEME}
        />
      );
    }
    function renderTagSetting() {
      return (
        <>
          <SwitchItem title="显示标签栏" event={HandlerEnum.TABS_SHOW} def={unref(getTagsShow)} />
          <SwitchItem
            title="显示标签右键"
            event={HandlerEnum.TABS_SHOW_CONTEXTMENU}
            def={unref(getShowContextmenu)}
          />
          <SwitchItem
            title="显示快速功能"
            event={HandlerEnum.TABS_SHOW_QUICK}
            def={unref(getShowQuick)}
          />
        </>
      );
    }
    function renderLoadSetting() {
      return (
        <>
          <SwitchItem
            title="进度条模式"
            event={HandlerEnum.OPEN_NPROGRESS}
            def={unref(getOpenNProgress)}
          />
          <SwitchItem
            title="页面遮罩模式"
            event={HandlerEnum.OPEN_PAGE_LOADING}
            def={unref(getOpenPageLoading)}
          />
        </>
      );
    }
    /**
     * @description 渲染其他配置
     * @returns {Element} VNode SwitchItem...
     */
    function renderOtherSetting() {
      return (
        <>
          <SwitchItem
            title="显示LOGO"
            event={HandlerEnum.SHOW_LOGO}
            def={unref(getShowLogo)}
            disabled={unref(getIsMixSidebar)}
          />

          <SwitchItem title="显示顶栏" event={HandlerEnum.HEADER_SHOW} def={unref(getShowHeader)} />

          <SwitchItem
            title="显示面包屑"
            event={HandlerEnum.SHOW_BREADCRUMB}
            def={unref(getShowBreadCrumb)}
            disabled={!unref(getShowHeader)}
          />

          <SwitchItem
            title="显示面包屑图标"
            event={HandlerEnum.SHOW_BREADCRUMB_ICON}
            def={unref(getShowBreadCrumbIcon)}
            disabled={!unref(getShowHeader)}
          />
          <SwitchItem title="显示水印" event={HandlerEnum.WATER_MARK} def={unref(getWaterMark)} />
          <SwitchItem title="灰色模式" event={HandlerEnum.GRAY_MODE} def={unref(getGrayMode)} />
          <SwitchItem title="色弱模式" event={HandlerEnum.COLOR_WEAK} def={unref(getColorWeak)} />
          <SwitchItem
            title="显示底部版权"
            event={HandlerEnum.SHOW_FOOTER}
            def={unref(getShowFooter)}
          />
        </>
      );
    }

    return () => (
      <BasicDrawer {...attrs} title="设置中心" width={340}>
        <el-divider>系统布局</el-divider>
        {renderLayoutPicker()}
        <el-divider>系统主题</el-divider>
        {renderAppTheme()}
        <el-divider>顶栏主题</el-divider>
        {renderHeaderTheme()}
        <el-divider>菜单主题</el-divider>
        {renderSiderTheme()}
        <el-divider>标签配置</el-divider>
        {renderTagSetting()}
        <el-divider>加载模式配置</el-divider>
        {renderLoadSetting()}
        <el-divider>其他配置</el-divider>
        {renderOtherSetting()}
      </BasicDrawer>
    );
  },
});
