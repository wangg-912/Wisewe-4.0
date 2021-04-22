import { defineComponent, computed, unref } from 'vue';
import { BasicDrawer } from '/@/components/Drawer/index';
import { APP_PRESET_COLOR_LIST, HEADER_PRESET_BG_COLOR_LIST, SIDE_BAR_BG_COLOR_LIST } from '/@/settings/designSetting'
import { useRootSetting } from '/@/hooks/setting/useRootSetting';
import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
import { LoyoutTypePicker, AppTheme, ThemePicker, SwitchItem} from './components'
import { baseHandler } from './handler';
import { HandlerEnum, menuTypeList } from "./enums" 

export default defineComponent({
  name: 'SettingDrawer',
  setup(_,{ attrs }){
    const {
      getContentMode,
      getShowBreadCrumb,
      getShowBreadCrumbIcon,
      getShowLogo,
      getFullContent,
      getColorWeak,
      getGrayMode,
      getThemeColor,
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
    /**
     * @description 渲染系统主题
     * @returns {Element} ThemePicker
     */
    function renderLayoutPicker(){
      return (
        <>
        <LoyoutTypePicker
          menuTypeList={menuTypeList}
          handler={(item: typeof menuTypeList[0]) => {
            baseHandler(HandlerEnum.CHANGE_LAYOUT, {
              bgColor: unref(getMenuType) == 'top-menu'?'#ffffff':unref(getMenuType),
              mode: item.mode,
              type: item.type,
              split: unref(getIsHorizontal) ? false : undefined,
            });
          }}
          def={unref(getMenuType)}
        />
        </>
      )
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
    /**
     * @description 渲染其他配置
     * @returns {Element} VNode SwitchItem... 
     */
    function renderOtherSetting(){
      return(
        <>
        <SwitchItem
            title="显示标签栏"
            event={HandlerEnum.SHOW_LOGO}
            def={unref(getShowLogo)}
            disabled={unref(getIsMixSidebar)}
          />

          <SwitchItem
            title="显示顶栏"
            event={HandlerEnum.HEADER_SHOW}
            def={unref(getShowHeader)}
          />
          
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

          <SwitchItem
            title="灰色模式"
            event={HandlerEnum.GRAY_MODE}
            def={unref(getGrayMode)}
          />
        </>
      )
    }


    return () => (
    <BasicDrawer
        {...attrs}
        title="设置中心"
        width={340}>
        <el-divider >系统布局</el-divider>
        {renderLayoutPicker()}
        <el-divider >系统主题</el-divider>
        {renderAppTheme()}
        <el-divider >顶栏主题</el-divider>
        { renderHeaderTheme() }
        <el-divider >菜单主题</el-divider>
        {renderSiderTheme()}
        <el-divider >其他配置</el-divider>
        {renderOtherSetting()}

    </BasicDrawer>
    )
  }
})
