import { defineComponent, computed, unref } from 'vue';
import { BasicDrawer } from '/@/components/Drawer/index';
import {ThemePicker} from './components'
import { useRootSetting } from '/@/hooks/setting/useRootSetting';
import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
import { baseHandler } from './handler';
import {HandlerEnum} from "./enums"
import { APP_PRESET_COLOR_LIST, HEADER_PRESET_BG_COLOR_LIST, SIDE_BAR_BG_COLOR_LIST } from '/@/settings/designSetting'
import LayoutTypePicker from '/@/components/LayoutTypePicker/index.vue'; 
export default defineComponent({
  name: 'SettingDrawer',
  components:{
    LayoutTypePicker,
  },
  setup(_,{ attrs }){
    const {
      getContentMode,
      getShowFooter,
      getShowBreadCrumb,
      getShowBreadCrumbIcon,
      getShowLogo,
      getFullContent,
      getColorWeak,
      getGrayMode,
      getLockTime,
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
      getShowMenu,
      getMenuType,
      getTrigger,
      getCollapsedShowTitle,
      getMenuFixed,
      getCollapsed,
      getCanDrag,
      getTopMenuAlign,
      getAccordion,
      getMenuWidth,
      getMenuBgColor,
      getIsTopMenu,
      getSplit,
      getIsMixSidebar,
      getCloseMixSidebarOnChange,
      getMixSideTrigger,
      getMixSideFixed,
    } = useMenuSetting();
    /**
     * @description 渲染系统主题
     * @returns {Element} ThemePicker
     */
    function renderAppTheme() {
      return (
        <ThemePicker
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


    return () => (
    <BasicDrawer
        {...attrs}
        title="设置中心"
        width={340}>
        <el-divider >系统布局</el-divider>
        <LayoutTypePicker />
        <el-divider >系统主题</el-divider>
        {renderAppTheme()}
        <el-divider >顶栏主题</el-divider>
        { renderHeaderTheme() }
        <el-divider >菜单主题</el-divider>
        {renderSiderTheme()}
        <el-divider >其他配置</el-divider>
        {/* TODO */}

    </BasicDrawer>
    )
  }
})
