<template>
  <div :class="prefixCls">
    <el-aside
      :class="[`${prefixCls}-wrapper`, `${prefixCls}--${theme}`, `${prefixCls}--${siderType}`]"
      :width="`${menusWidth}px`"
    >
      <AppLogo v-if="showLogo && !getIsMobile" :showLogoTitle="logoTitle" :theme="theme" />
      <el-scrollbar
        wrap-class="scrollbar-wrapper"
        :style="{ height: getIsMobile ? '100%' : showLogo ? 'calc(100% - 50px)' : '100%' }"
      >
        <el-menu
          :mode="navMode"
          :collapse="isCollapse"
          :unique-opened="false"
          :default-active="activeMenu"
          :class="[
            `${prefixCls}-aside`,
            `${prefixCls}-aside--${theme}`,
            `${prefixCls}-aside-${isCollapse ? 'collapse' : 'expend'}`,
            `${prefixCls}-aside--${siderType}`,
          ]"
          :collapse-transition="false"
          @select="menuHandle"
        >
          <menu-items
            v-for="v in showMenuTab ? menuTabLists : menuLists"
            :key="v.name"
            :menu="v"
            :theme="theme"
            :siderType="siderType"
            :base-path="v.path"
          />
        </el-menu>
      </el-scrollbar>
    </el-aside>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType, computed, unref } from 'vue';
  import { useRouter } from 'vue-router';
  import { routeStore } from '/@/store/modules/route';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useRootSetting } from '/@/hooks/setting/useRootSetting';
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
  import { useAppInject } from '/@/hooks/web/useAppInject';
  import { useGo } from '/@/hooks/web/usePage';
  import { isExternal } from '/@/utils/tools';
  import { AppLogo } from '/@/components/Applications';
  import MenuItems from './menus.vue';

  export default defineComponent({
    name: 'LayoutSider',
    components: { AppLogo, MenuItems },
    props: {
      navMode: {
        type: String as PropType<string>,
        default: 'vertical',
      },
      siderType: {
        type: String as PropType<string>,
        default: 'sidebar',
      },
    },
    setup(props) {
      /* const $routes = useRouter(); */
      const go = useGo();
      const { getShowLogo } = useRootSetting();
      const {
        getMenuWidth,
        getCollapsed,
        getShowLogoTitle,
        getMenuTheme,
        getMenuType,
      } = useMenuSetting();
      const { getIsMobile } = useAppInject();
      const { currentRoute } = useRouter();
      const isCollapse = computed(() => unref(getCollapsed));
      const activeMenu = computed(() => {
        const { path } = currentRoute.value;
        return path;
      });
      const menusWidth = computed(() => {
        if (props.siderType == 'top-menu') {
          return 'auto';
        } else {
          return unref(getMenuWidth);
        }
      });
      const logoTitle = computed(() => unref(getShowLogoTitle));

      const showLogo = computed(() => {
        return (
          unref(getShowLogo) &&
          (unref(getMenuType) === 'sidebar' || unref(getMenuType) === 'mix-sidebar')
        );
      });
      const { prefixCls } = useDesign('layout-sider');
      const menuLists = computed(() => routeStore.getRoutes);
      const showMenuTab = computed(() => props.siderType === 'mix-sidebar');
      const menuTabLists = computed(() => routeStore.menuTabRouters);
      const theme = computed(() => unref(getMenuTheme));
      /**
       * @description 菜单点击事件
       */
      function menuHandle(path: string) {
        if (currentRoute.value.fullPath === path) return;
        if (isExternal(path)) {
          window.open(path);
        } else {
          go(path);
        }
      }

      return {
        isCollapse,
        getIsMobile,
        logoTitle,
        activeMenu,
        menusWidth,
        showLogo,
        prefixCls,
        theme,
        getMenuType,
        menuLists,
        menuHandle,
        showMenuTab,
        menuTabLists,
      };
    },
  });
</script>
<style lang="scss" scoped>
  @mixin set-menu-item($background, $color) {
    color: $color !important;
    background-color: $background !important;
  }
  .#{$namespace}-layout-sider {
    height: inherit;
    background: var(--sider-dark-bg-color);

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

      &--light {
        background: var(--sider-dark-bg-color);

        ::v-deep(.el-submenu__title) {
          & i {
            color: #303133 !important;
          }
        }
      }

      &--dark {
        background: var(--sider-dark-bg-color);
      }

      &--top-menu {
        background: var(--header-bg-color);
        border-bottom: 0;
      }
    }
  }
</style>
<style lang="scss">
  .mobile-menu-drawer {
    .el-drawer__header {
      display: none !important;
      width: 0;
      height: 0;
      padding: 0;
    }
  }
</style>
