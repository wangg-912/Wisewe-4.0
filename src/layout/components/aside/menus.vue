<template>
  <template v-if="hasOneShowingChild(menu.children, menu) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !menu.meta?.affix">
    <MenuItem
      v-if="!menu.meta?.hidden"
      :vpath="resolvePath(onlyOneChild.path,'')"
      :item="menu"
      :class="[
        `${prefixCls}--${theme}-item`,
        `${siderType}` !== 'top-menu' && `${prefixCls}--${theme}-${collapse}-icon`,
        `${prefixCls}--${siderType}-icon`,
      ]"
      :color="`${collapse}` == 'collapse' ? '#ffffff' : ''"
    />
  </template>
  <el-submenu
    v-else
    :index="resolvePath(menu.path, '')"
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
        style="padding-right: 2px"
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
  
</template>
<script lang="ts">
  import { resolve } from 'path';
  import { defineComponent, computed, unref, PropType, ref } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { propTypes } from '/@/utils/propTypes';
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
  import { isExternal } from '/@/utils/tools';
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
    components: { MenuItem, FontIcon },
    setup(context) {
      const onlyOneChild = ref<any>(null);
      const { prefixCls } = useDesign('sider-menu');
      const { getCollapsed } = useMenuSetting();
      const { menu, basePath } = context;
      const collapse = computed(() => (unref(getCollapsed) ? 'collapse' : 'expend'));
      /* debugger; */
      const cmenuList = computed(() => {
        if (menu.children) return menu.children.filter((v) => !v.meta.hidden);
        return [];
      });
      function hasOneShowingChild(children: RouteRecordRaw[] = [], parent: RouteRecordRaw): boolean {
        const showingChildren: RouteRecordRaw[] = children.filter((item: RouteRecordRaw) => {
          if (item.meta && item.meta.hidden) {
            return false;
          } else {
            // Temp set(will be used if only has one showing child)
            onlyOneChild.value = item;
            return true;
          }
        })
        // When there is only one child router, the child router is displayed by default
        if (showingChildren.length === 1) {
          return true;
        }
        // Show parent if there are no child router to display
        if (showingChildren.length === 0) {
          onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
          return true;
        }
        return false;
      }

      function resolvePath(routePath: string, otherPath: string): string {
        if (isExternal(routePath)) {
          return routePath;
        }
        //console.log(resolve(otherPath || basePath, routePath),'123')
        return resolve(otherPath || basePath, routePath);
      }

      /* onMounted(() => {
        console.log(context.menu);
      }); */
      /*  */
      return {
        prefixCls,
        collapse,
        onlyOneChild,
        haChild: menu.children && menu.children.length > 0,
        hasOneShowingChild,
        resolvePath,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .#{$namespace}-sider-menu {
    &--light {
    }
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
        background-color: var(--sider-dark-bg-color);
        color: $--color-white !important;
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
        background-color: var(--header-bg-color);
        color: $--color-drak !important;
        padding: 0 12px !important;
        & i {
          color: #333 !important;
        }
        &:hover {
          background-color: rgb(217, 236, 255) !important;
          color: $--color-primary !important;
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
