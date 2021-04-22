<template>
  <el-header v-if="getShowHeader" :class="getHeaderClass">
    <div :class="`${prefixCls}-left`">
      <AppLogo
        v-if="showHeadLogo"
        :class="[`${prefixCls}-logo`, `${prefixCls}--${headerTheme}`]"
        :theme="headerTheme"
        :siderType="siderType"
      />
      <!-- <LayoutTypePicker /> -->
      <div :class="`${prefixCls}-left--bread`" v-if="siderType !== `top-menu`">
        <LayoutTrigger :theme="headerTheme" />
        <BreadCrumb v-if="getShowBread" :theme="headerTheme" />
      </div>
    </div>
    <div :class="`${prefixCls}-center`">
      <LayoutSider
        v-if="`${siderType}` == 'top-menu'"
        :navMode="siderType == 'top-menu' ? 'horizontal' : 'vertical'"
        :siderType="siderType"
      />
    </div>
    <div :class="[`${prefixCls}-right`, `${prefixCls}-right--${headerTheme}`]">
      <div :class="`${prefixCls}-right--item`">
        <i class="el-icon-search" size="18"></i>
      </div>
      <div v-if="getShowNotice" :class="`${prefixCls}-right--item`">
        <el-badge is-dot type="danger">
          <i class="el-icon-bell" size="18"></i>
        </el-badge>
      </div>
      <div v-if="getShowFullScreen" :class="`${prefixCls}-right--item`">
        <Screenfull />
      </div>
      <div :class="`${prefixCls}-right--item`">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      </div>
      <div :class="[`${prefixCls}-right--item`, `${prefixCls}-right--user`]">
        <el-dropdown>
          <span class="el-dropdown-link drop--user--text" style="font-size: 12px">管理员</span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="modify">
                <i class="el-icon-edit"></i>修改密码
              </el-dropdown-item>
              <el-dropdown-item divided command="loginout">
                <i class="el-icon-switch-button"></i>退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <SettingDrawer v-if="getShowSettingButton" :class="`${prefixCls}-right--item`" />
    </div>
  </el-header>
</template>
<script lang="ts">
  import type { PropType } from 'vue';
  import { defineComponent, computed, unref } from 'vue';
  import { createAsyncComponent } from '/@/utils/factory/asyncComponents';
  import { useRootSetting } from '/@/hooks/setting/useRootSetting';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
  import { SettingButtonPositionEnum } from '/@/enums/appEnum';
  import { AppLogo } from '/@/components/Applications';
  import BreadCrumb from './components/BreadCrumb.vue';
  import LayoutTrigger from './components/Trigger.vue';
  import Screenfull from './components/Screenfull.vue';
  export default defineComponent({
    name: 'LayoutHeader',
    props: {
      siderType: {
        type: String as PropType<string>,
        dafault: '',
      },
      fixed: {
        type: Boolean as PropType<boolean>,
        default: true,
      },
    },
    components: {
      AppLogo,
      LayoutTrigger,
      BreadCrumb,
      Screenfull,
      SettingDrawer: createAsyncComponent(() => import('/@/layout/components/setting/index.vue'), {
        loading: true,
      }),
      LayoutSider: createAsyncComponent(() => import('/@/layout/components/aside/index.vue')),
    },
    setup(props) {
      const { getShowSetting, getSettingPosition } = useRootSetting();
      const { prefixCls } = useDesign('layout-header');
      const {
        getHeaderTheme,
        getShowFullScreen,
        getShowNotice,
        getShowBread,
        getShowHeaderLogo,
        getShowHeader,
      } = useHeaderSetting();
      const showHeadLogo = computed(() => unref(getShowHeaderLogo));
      const getHeaderClass = computed(() => {
        const theme = unref(getHeaderTheme);
        return [
          prefixCls,
          {
            [`${prefixCls}--fixed`]: props.fixed,
            [`${prefixCls}--${theme}`]: theme,
          },
        ];
      });
      const headerTheme = computed(() => unref(getHeaderTheme));
      const getShowSettingButton = computed(() => {
        if (!unref(getShowSetting)) {
          return false;
        }
        const settingButtonPosition = unref(getSettingPosition);

        if (settingButtonPosition === SettingButtonPositionEnum.AUTO) {
          return unref(getShowHeader);
        }
        return settingButtonPosition === SettingButtonPositionEnum.HEADER;
      });

      return {
        prefixCls,
        getHeaderClass,
        headerTheme,
        showHeadLogo,
        getShowBread,
        getShowNotice,
        getShowFullScreen,
        getShowHeader,
        getShowSettingButton,
      };
    },
  });
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
