<template>
  <el-header :class="[prefixCls]">
    <!-- <AppLogo /> -->
    <!-- <LayoutTypePicker /> -->
    <div :class="`${prefixCls}-left`">
      <span :class="`${prefixCls}-left--collapse`"><i class="el-icon-s-fold"></i></span>
      <div :class="`${prefixCls}-left--breadcrumb`">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/404' }"><i class="el-icon-bicycle"></i> 活动管理</el-breadcrumb-item>
          <el-breadcrumb-item><i class="el-icon-s-home"></i> 活动详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div :class="`${prefixCls}-center`">
      <el-menu default-active="1" :class="`${prefixCls}-center--menus`" mode="horizontal">
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
      </el-menu>
    </div>
    <div :class="`${prefixCls}-right`">
      <div :class="`${prefixCls}-right--item`">
        <svg-icon type="icon-sousuo4" size="16" />
      </div>
      <div :class="`${prefixCls}-right--item`">
        <el-badge is-dot type="danger">
          <i class="el-icon-bell" size="18"></i>
        </el-badge>
      </div>
      <div :class="`${prefixCls}-right--item`">
        <i class="el-icon-full-screen" size="18"></i>
      </div>
      <div :class="`${prefixCls}-right--item`">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      </div>
      <div :class="[`${prefixCls}-right--item`, `${prefixCls}-right--user`]">
        <el-dropdown>
          <span class="el-dropdown-link" style="fontsize: 12px">管理员</span>
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
      <div :class="`${prefixCls}-right--item`">
        <i class="el-icon-setting" size="18"></i>
      </div>
    </div>
  </el-header>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { AppLogo } from '/@/components/Applications';
  import SvgIcon from '/@/components/SvgIcon/index.vue';
  /* import LayoutTypePicker from './components/LayoutTypePicker.vue'; */
  export default defineComponent({
    name: 'LayoutHeader',
    components: {
      AppLogo,
      SvgIcon,
      /* LayoutTypePicker, */
    },
    setup() {
      const { prefixCls } = useDesign('layout-header');
      return {
        prefixCls,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .#{$namespace}-layout-header {
    width: 100%;
    height: $headers-height !important;
    border-bottom: 1px solid #eee;
    padding: 0 !important;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &-left,
    &-center,
    &-right {
      display: flex;
      align-items: center;
    }
    &-left {
      height: 100%;
      &--collapse {
        padding: 0 12px;
        i {
          font-size: $--font-size-medium;
          cursor: pointer;
        }
      }
      &--breadcrumb {
        margin-top: -1px;
        ::v-deep(.el-breadcrumb__inner.is-link),
        ::v-deep(.el-breadcrumb__inner a) {
          font-weight: 400 !important;
        }
        ::v-deep(.el-breadcrumb__separator) {
          margin: 0 2px !important;
        }
      }
    }

    &-center {
      &--menus {
        height: 48px;
        border-bottom: none;
        ::v-deep(.el-submenu__title),
        ::v-deep(.el-menu-item) {
          border-bottom: inherit;
          height: 48px;
          line-height: 48px;
          padding: 0 10px;
        }
        ::v-deep(.el-menu-item.is-active),
        ::v-deep(.el-submenu.is-active .el-submenu__title) {
          border-bottom: 2px solid #0960bd;
          color: #0960bd;
        }
      }
    }
    &-right {
      min-width: 180px;
      &--item {
        display: flex;
        height: 48px;
        padding: 0 8px;
        font-size: 1.2em;
        cursor: pointer;
        align-items: center;
      }
      &--user {
        padding-left: 0;
        font-size: $--font-size-extra-small;
      }
    }
  }
</style>
