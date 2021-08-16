<template>
  <el-submenu
    v-if="menu.children && menu.children.length && !menu.meta?.hidden"
    :index="resolvePath(menu.path, showMenuTab ? `${activeTab}/${basePath}` : '')"
    :class="[
      `${prefixCls}--${theme}`,
      `${siderType}` !== 'top-menu' && `${prefixCls}--${theme}-${collapse}`,
      `${prefixCls}--${siderType}`,
    ]"
  >
    <template #title>
      <font-icon
        v-if="menu.meta.icon"
        :type="menu.meta.icon"
        style="padding-right: 2px;"
        :class="[
          `${siderType}` !== 'top-menu' && `${prefixCls}--${theme}-${collapse}-icon`,
          `${prefixCls}--${siderType}-icon`,
        ]"
        :color="
          `${siderType}` !== 'top-menu' ? (`${collapse}` == 'collapse' ? '#ffffff' : '') : '#333333'
        "
      />
      <span v-if="menu.meta && menu.meta.title" :class="`${prefixCls}--${theme}_sub-title`">{{
        menu.meta.title
      }}</span>
    </template>
    <!-- TODO -->
    <MenuItems
      v-for="c in menu.children"
      :key="c.name"
      :menu="c"
      :theme="theme"
      :siderType="siderType"
      :base-path="resolvePath(c.path)"
    />
  </el-submenu>
  <template v-else-if="hasOneShowingChild(menu.children, menu) && !menu.meta?.hidden">
    <MenuItem
      v-if="!menu.meta?.hidden"
      :vpath="resolvePath(onlyOneChild.path, showMenuTab ? `${activeTab}/${basePath}` : '')"
      :item="menu"
      :class="[
        `${prefixCls}--${theme}-item`,
        `${siderType}` !== 'top-menu' && `${prefixCls}--${theme}-${collapse}-icon`,
        `${prefixCls}--${siderType}-icon`,
      ]"
      :color="`${collapse}` == 'collapse' ? '#ffffff' : ''"
    />
  </template>
</template>
<script lang="ts">
  import { resolve } from 'path';
  import { defineComponent, computed, unref, PropType, ref } from 'vue';
  import { RouteRecordRaw } from 'vue-router';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { propTypes } from '/@/utils/propTypes';
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
  import { isExternal } from '/@/utils/tools';
  import { routeStore } from '/@/store/modules/route';
  import FontIcon from '/@/components/FontIcon/index.vue';
  import MenuItem from './item.vue';
  export default defineComponent({
    name: 'MenuItems',
    props: {
      theme: propTypes.oneOf(['dark', 'light']),
      menu: {
        type: Object as PropType<object>,
        default: () => {},
      },
      siderType: {
        type: String as PropType<string>,
        default: 'sidebar',
      },
      basePath: {
        type: String as PropType<string>,
        default: '',
      },
    },
    // eslint-disable-next-line vue/order-in-components
    components: { MenuItem, FontIcon },
    setup(context) {
      const onlyOneChild = ref<any>(null);
      const { prefixCls } = useDesign('sider-menu');
      const { getCollapsed } = useMenuSetting();
      const { basePath, siderType } = context;
      // console.log(basePath)
      const collapse = computed(() => (unref(getCollapsed) ? 'collapse' : 'expend'));
      const activeTab = computed(() => routeStore.activeTag);
      //console.log(activeTab.value, basePath, '123');
      const showMenuTab = computed(() => siderType === 'mix-sidebar');
      function hasOneShowingChild(
        children: RouteRecordRaw[] = [],
        parent: RouteRecordRaw
      ): boolean {
        const showingChildren: RouteRecordRaw[] = children.filter((item: RouteRecordRaw) => {
          if (item.meta && item.meta.hidden) {
            return false;
          } else {
            onlyOneChild.value = item;
            return true;
          }
        });
        if (showingChildren.length === 0) {
          onlyOneChild.value = { ...parent, path: '', noShowingChildren: true };
          return true;
        }
        return false;
      }
      /**
       * @description 路径整合
       * @param {String} routePath
       * @param {String} otherPath
       */
      function resolvePath(routePath: string, otherPath: string): string {
        if (isExternal(routePath)) {
          return routePath;
        }
        return otherPath ? resolve(otherPath || basePath, routePath) : resolve(basePath, routePath);
      }
      return {
        prefixCls,
        collapse,
        onlyOneChild,
        hasOneShowingChild,
        resolvePath,
        activeTab,
        showMenuTab,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .#{$namespace}-sider-menu {
    &--dark {
      &-collapse {
        ::v-deep(.el-submenu__title) {
          padding: 0 16px !important;

          i {
            color: $--color-white !important;
          }
        }
      }

      &-item,
      ::v-deep(.el-submenu__title) {
        color: $--color-white !important;
        background-color: var(--sider-dark-bg-color);

        & i {
          color: $--color-white !important;
        }
      }

      &-icon i {
        color: $--color-white !important;
      }

      &-collapse-icon {
        width: auto !important;
        height: 46px !important;
        visibility: visible !important;
      }
    }

    &--top-menu {
      border-bottom: none !important;

      &-item,
      ::v-deep(.el-submenu__title) {
        padding: 0 12px !important;
        color: $--color-drak !important;
        background-color: var(--header-bg-color);

        & i {
          color: #333 !important;
        }

        &:hover {
          color: $--color-primary !important;
          background-color: rgb(217, 236, 255) !important;

          i {
            color: $--color-primary !important;
          }
        }
      }

      &-icon {
        color: #333 !important;

        &:hover {
          color: $--color-primary !important;
          background-color: rgb(217, 236, 255) !important;

          i {
            color: $--color-primary !important;
          }
        }

        & i {
          color: #333 !important;
        }
      }
    }
  }
</style>
