<template>
  <el-header v-if="getShowHeader" :class="getHeaderClass">
    <div :class="`${prefixCls}-left`">
      <AppLogo v-if="showHeadLogo" :class="[`${prefixCls}-logo`, `${prefixCls}--${theme}`]" />
      <!-- <LayoutTypePicker /> -->
      <div v-if="getShowBread" :class="`${prefixCls}-left--bread`">
        <LayoutTrigger :theme="theme" />
        <BreadCrumb :theme="theme" />
      </div>
    </div>
    <div :class="`${prefixCls}-center`">
      <!-- <el-menu default-active="1" :class="`${prefixCls}-center--menus`" mode="horizontal">
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-submenu index="2">
          <template #title>我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template #title>选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3">消息中心</el-menu-item>
        <el-menu-item index="4">订单管理</el-menu-item>
      </el-menu> -->
    </div>
    <div :class="[`${prefixCls}-right`, `${prefixCls}-right--${theme}`]">
      <div :class="`${prefixCls}-right--item`">
        <i class="el-icon-search" size="18"></i>
      </div>
      <div v-if="getShowNotice" :class="`${prefixCls}-right--item`">
        <el-badge is-dot type="danger">
          <i class="el-icon-bell" size="18"></i>
        </el-badge>
      </div>
      <div v-if="getShowFullScreen" :class="`${prefixCls}-right--item`">
        <i class="el-icon-full-screen" size="18"></i>
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
  import LayoutTrigger from "./components/Trigger.vue"
  /* import LayoutTypePicker from './components/LayoutTypePicker.vue'; */
  export default defineComponent({
    name: 'LayoutHeader',
    components: {
      AppLogo,
      LayoutTrigger,
      BreadCrumb,
      SettingDrawer: createAsyncComponent(() => import('/@/layout/components/setting/index.vue'), {
        loading: true,
      }),
      /* LayoutTypePicker, */
    },
    props: {
      fixed: {
        type: Boolean as PropType<boolean>,
        default: true,
      },
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
      const theme = computed(() => {
        return unref(getHeaderTheme);
      })
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
        theme,
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
