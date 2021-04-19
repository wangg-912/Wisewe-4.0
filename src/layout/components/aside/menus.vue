<template>
  <el-submenu v-if="haChild" :index="menu.path" :class="`${prefixCls}--${theme}`">
    <template #title>
        <svg-icon v-if="menu.meta.icon" :type="menu.meta.icon.split('iconfont ')[1]" size="16" style="padding-right:8px;" />
        <span v-if="menu.meta && menu.meta.title" :class="`${prefixCls}--${theme}_sub-title`">{{ menu.meta.title }}</span>
    </template>
    <!-- TODO -->
    <MenuItems
      v-if="menu.children && menu.children.length"
      v-for="c in menu.children"
      :key="c.name"
      :menu="c"
      :index="c.path"
      :theme="theme"
    />
  </el-submenu>
  <MenuItem v-else :index="menu.path" :item="menu" :class="`${prefixCls}--${theme}_item`" />
</template>
<script lang="ts">
  import { defineComponent, computed, onMounted, PropType } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { propTypes } from '/@/utils/propTypes';
  import SvgIcon from '/@/components/SvgIcon/index.vue';
  import MenuItem from './item.vue';
  export default defineComponent({
    name: 'MenuItems',
    props: {
      theme: propTypes.oneOf(['dark', 'light']),
      menu: {
        type: Object as PropType<object>,
        default: () => {},
      },
    },
    components: { MenuItem, SvgIcon },
    setup(context) {
      const { prefixCls } = useDesign('sider-menu');
      const { menu } = context;
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
        haChild: menu.children && menu.children.length > 0,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .#{$namespace}-sider-menu{
    &--light{

    }
    &--dark{
      &_item,::v-deep(.el-submenu__title){
        background-color: var(--sider-dark-bg-color);
        color: $--color-white;
      }
    }
  }
</style>
