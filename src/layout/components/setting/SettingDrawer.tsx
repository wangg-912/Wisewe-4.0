import { defineComponent, computed, unref } from 'vue';
import { BasicDrawer } from '/@/components/Drawer/index';
import { APP_PRESET_COLOR_LIST, HEADER_PRESET_BG_COLOR_LIST, SIDE_BAR_BG_COLOR_LIST } from '/@/settings/designSetting'
import { useRootSetting } from '/@/hooks/setting/useRootSetting';
import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
import { AppTheme, ThemePicker, SwitchItem} from './components'
import { baseHandler } from './handler';
import { HandlerEnum, menuTypeList } from "./enums"

import LayoutTypePicker from '/@/components/LayoutTypePicker/index.vue'; 

export default defineComponent({
  name: 'SettingDrawer',
  components:{
    LayoutTypePicker,
  },
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
        <LayoutTypePicker
          menuTypeList={menuTypeList}
          handler={(item: typeof menuTypeList[0]) => {
            baseHandler(HandlerEnum.CHANGE_LAYOUT, {
              mode: item.mode,
              type: item.type,
              split: unref(getIsHorizontal) ? false : undefined,
            });
          }}
          def={unref(getMenuType)}
        ></LayoutTypePicker>
      )
    }
    function renderAppTheme() {
      return (
        <AppTheme
          colorList={APP_PRESET_COLOR_LIST} 
          def={unref(getThemeColor)} 
          event={HandlerEnum.CHANGE_THEME_COLOR}
        />
      );
    }
    function renderHeaderTheme() {
      return (
        <ThemePicker
          colorList={HEADER_PRESET_BG_COLOR_LIST}
          def={unref(getHeaderBgColor)}
          event={HandlerEnum.HEADER_THEME}
        />
      );
    }

    function renderSiderTheme() {
      return (
        <ThemePicker
          colorList={SIDE_BAR_BG_COLOR_LIST}
          def={unref(getMenuBgColor)}
          event={HandlerEnum.MENU_THEME}
        />
      );
    }

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
