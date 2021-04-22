<template>
  <el-menu-item v-if="iName" :index="iPath">
    <font-icon v-if="iIcon" :type="iIcon" style="padding-right: 2px" :color="color" />
    <template #title>
      <span>{{ iTitle }}</span>
    </template>
  </el-menu-item>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import FontIcon from '/@/components/FontIcon/index.vue';
  export default defineComponent({
    name: 'MenuItem',
    props: {
      item: {
        type: Object as PropType<object>,
        default: () => {},
      },
      color: {
        type: String as PropType<string>,
        default: '',
      },
    },
    components: { FontIcon },
    setup(context) {
      return {
        iPath: context.item.path,
        iName: context.item.name,
        iIcon: context.item.meta && context.item.meta.icon,
        iTitle: context.item.meta && context.item.meta.title,
      };
    },
  });
</script>
