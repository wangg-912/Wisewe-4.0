<template>
  <el-submenu v-if="haChild" :index="menu.path">
    <template #title>
      <svg-icon v-if="menu.meta.icon" :type="menu.meta.icon.split('iconfont ')[1]" size="16" style="padding-right:8px;" />
      <!-- <i :class="menu.meta && menu.meta.icon ? menu.meta.icon : 'el-icon-location'"></i> -->
      <span v-if="menu.meta && menu.meta.title">{{ menu.meta.title }}</span>
    </template>
    <!-- TODO -->
    <MenuItems
      v-if="menu.children && menu.children.length"
      v-for="c in menu.children"
      :key="c.name"
      :menu="c"
      :index="c.path"
    />
  </el-submenu>
  <MenuItem v-else :index="menu.path" :item="menu" />
</template>
<script lang="ts">
  import { defineComponent, computed, onMounted, PropType } from 'vue';
  import SvgIcon from '/@/components/SvgIcon/index.vue';
  import MenuItem from './item.vue';
  export default defineComponent({
    name: 'MenuItems',
    props: {
      menu: {
        type: Object as PropType<object>,
        default: () => {},
      },
    },
    components: { MenuItem, SvgIcon },
    setup(context) {
      const {menu} = context;
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
        haChild: menu.children && menu.children.length > 0,
      };
    },
  });
</script>
