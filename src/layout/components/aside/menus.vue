<template>
  <el-submenu
    v-if="haChild"
    :index="menu.path"
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
        :class="[`${siderType}` !== 'top-menu' && `${prefixCls}--${theme}-${collapse}-icon`, `${prefixCls}--${siderType}-icon`]"
        :color="`${siderType}` !== 'top-menu'?`${collapse}` == 'collapse' ? '#ffffff' : '':'#333333'"
      />
      <span v-if="menu.meta && menu.meta.title" :class="`${prefixCls}--${theme}_sub-title`">{{
        menu.meta.title
      }}</span>
    </template>
    <!-- TODO -->
    <MenuItems
      v-if="menu.children && menu.children.length"
      v-for="c in menu.children"
      :key="c.name"
      :menu="c"
      :index="c.path"
      :theme="theme"
      :siderType="siderType"
    />
  </el-submenu>
  <MenuItem
    v-else
    :index="menu.path"
    :item="menu"
    :class="[`${prefixCls}--${theme}-item`,`${siderType}` !== 'top-menu' && `${prefixCls}--${theme}-${collapse}-icon`, `${prefixCls}--${siderType}-icon`]"
    :color="`${collapse}` == 'collapse' ? '#ffffff' : ''"
  />
</template>
<script lang="ts">
  import { defineComponent, computed, unref, PropType } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { propTypes } from '/@/utils/propTypes';
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
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
    },
    components: { MenuItem, FontIcon },
    setup(context) {
      const { prefixCls } = useDesign('sider-menu');
      const { getCollapsed } = useMenuSetting();
      const { menu } = context;
      const collapse = computed(() => (unref(getCollapsed) ? 'collapse' : 'expend'));
      /* debugger; */
      const cmenuList = computed(() => {
        if (menu.children) return menu.children.filter((v) => !v.meta.hidden);
        return [];
      });

      /* onMounted(() => {
        console.log(context.menu);
      }); */
      /*  */
      return {
        prefixCls,
        collapse,
        haChild: menu.children && menu.children.length > 0,
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
          i{
            color: $--color-white !important;
          }
        }
      }
      &-item,
      ::v-deep(.el-submenu__title) {
        background-color: var(--sider-dark-bg-color);
        color: $--color-white!important;
        & i {
          color: $--color-white !important;
        }
      }
      &-icon i{
        color: $--color-white !important;
      }
      &-collapse-icon {
        width: auto!important;
        height: 46px !important;
        visibility: visible !important;
      }
    }
    &--top-menu {
      border-bottom: none !important;
      
      &-item,
      ::v-deep(.el-submenu__title) {
        background-color: #ffffff;
        color: $--color-drak !important;
        padding: 0 12px !important;
        & i {
          color: #333 !important;
        }
        &:hover{
          background-color: rgb(217, 236, 255) !important;
          color: $--color-primary !important;
          i{
            color: $--color-primary !important;
          }
        }
      }
      &-icon{
        
        color: #333 !important;
        &:hover{
          color: $--color-primary !important;
          background-color: rgb(217, 236, 255) !important;
          i{
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
