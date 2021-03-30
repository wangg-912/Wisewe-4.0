<template>
  <el-menu-item v-if="iName" :index="iPath">
      <svg-icon v-if="iIcon" :type="iIcon.split('iconfont ')[1]" size="16" style="padding-right:8px;" />
      <template #title>{{iTitle}}</template>
    </el-menu-item>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import SvgIcon from '/@/components/SvgIcon/index.vue';
  export default defineComponent({
    name:"MenuItem",
    props:{
      item: {
        type: Object as PropType<object>,
        default: () => {}
      }
    },
    components:{SvgIcon},
    setup(context){
      return{
        iPath:context.item.path,
        iName:context.item.name,
        iIcon:context.item.meta && context.item.meta.icon,
        iTitle:context.item.meta && context.item.meta.title,

      }
    }
  })
</script>
