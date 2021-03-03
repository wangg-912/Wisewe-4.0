<template>
  
  <el-main :class="prefixCls">
    <router-view />
  </el-main>
      
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign'
  export default defineComponent({
    name: 'LayoutContent',
    
    setup(){
      const { prefixCls } = useDesign('layout-container');

      return{
        prefixCls,
      }

    }
  });
</script>
<style lang="scss" scoped>

  .#{$namespace}-layout-container{
    flex-direction: row;
  }

</style>
