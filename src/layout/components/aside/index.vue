<template>
  <div :class="prefixCls">
    <el-aside
      :class="[`${prefixCls}-wrapper`, `${prefixCls}--${theme}`]"
      :width="`${menusWidth}px`"
    >
      <AppLogo v-if="showLogo" :showLogoTitle="logoTitle" :theme="theme" />
      <el-scrollbar
        wrap-class="scrollbar-wrapper"
        :style="{ height: showLogo ? 'calc(100% - 50px)' : '100%' }"
      >
        <el-menu
          :collapse="isCollapse"
          :uniqueOpened="true"
          default-active="1-1"
          :class="[`${prefixCls}-aside`, `${prefixCls}-aside--${theme}`]"
          :collapse-transition="false"
        >
          <menu-items v-for="v in menuLists" :key="v.name" :menu="v" :index="v.path" :theme="theme" />
        </el-menu>
      </el-scrollbar>
    </el-aside>
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed, unref } from 'vue';
  import { useRouter } from 'vue-router';
  import { appStore } from '/@/store/modules/app';
  import { routeStore } from '/@/store/modules/route';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
  
  import { AppLogo } from '/@/components/Applications';
  import MenuItems from './menus.vue';

  export default defineComponent({
    name: 'LayoutSider',
    components: { AppLogo, MenuItems },
    setup() {
      const { getMenuWidth, getCollapsed, getShowLogoTitle, getMenuTheme } = useMenuSetting();
      const $routes = useRouter();
      const isCollapse = computed(() => unref(getCollapsed));
      const menusWidth = computed(() => unref(getMenuWidth));
      const logoTitle = computed(() => unref(getShowLogoTitle));
      const showLogo = computed(() => appStore.getProjectConfig.showLogo);
      const { prefixCls } = useDesign('layout-sider');
      const menuLists = computed(() => routeStore.getRoutes);
      const theme = computed(() => unref(getMenuTheme));
      /*  onMounted(() => {
        setTimeout(() => {
          console.log($routes, '3');
        }, 1000);
      }); */

      return {
        isCollapse,
        logoTitle,
        menusWidth,
        showLogo,
        prefixCls,
        theme,
        menuLists,
      };
    },
  });
</script>
<style lang="scss" scoped>
  @mixin set-menu-item($background, $color) {
    background-color: $background !important;
    color: $color !important;
  }
  .#{$namespace}-layout-sider {
    background: var(--sider-dark-bg-color);
    height: inherit;
    &-wrapper {
      height: inherit;
    }
    &-aside {
      border-right: none;

      .el-submenu__title,
      .el-submenu__title i,
      .submenu__title span {
        background: transparent;
      }

      ::v-deep(.el-submenu .el-menu-item),
      ::v-deep(.el-menu-item),
      ::v-deep(.el-submenu__title) {
        height: 46px;
        line-height: 46px;
        & i {
          color: $--color-white !important;
        }
        &:not(.is-active):hover {
          @include set-menu-item(rgb(217, 236, 255), $--color-primary);
          & i {
            color: $--color-primary !important;
          }
        }
      }
      ::v-deep(.el-menu-item) {
        &.is-active {
          @include set-menu-item(#0960bd, $--color-white);
        }
      }
      &--light{
        background: var(--sider-dark-bg-color);
        ::v-deep(.el-submenu__title) {
          & i {
          color: #303133 !important;
        }
        }
      }
      &--dark{
        background: var(--sider-dark-bg-color);
      }
    }
  }
</style>
