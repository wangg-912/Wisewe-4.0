<template>
  <!-- 默认排版 -->
  <el-container :class="[`${prefixCls}--sidebar`]">
    <LayoutFeatures />
    <!-- <el-aside width="200px">Aside</el-aside> -->
    <LayoutSider />
    <el-container direction="vertical" :calss="!prefixCls" style="border-left: 1px solid #eee">
      <LayoutHeader fixed />
      <LayoutTags />
      <LayoutContent />
      <LayoutFooter />
    </el-container>
  </el-container>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { createAsyncComponent } from '/@/utils/factory/asyncComponents';
  import { getMenusDate } from '/@/api/app'
  import { generatorDynamicRouter } from '/@/router/asyncRouter'
  /* import router from '/@/router'; */
  export default defineComponent({
    name: 'Layout',
    components: {
      LayoutFeatures: createAsyncComponent(() => import('/@/layout/components/feature/index.vue')),
      LayoutHeader: createAsyncComponent(() => import('/@/layout/components/header/index.vue')),
      LayoutSider: createAsyncComponent(() => import('/@/layout/components/aside/index.vue')),
      LayoutTags: createAsyncComponent(() => import('/@/layout/components/tags/index.vue')),
      LayoutContent: createAsyncComponent(() => import('/@/layout/components/content/index.vue')),
      LayoutFooter: createAsyncComponent(() => import('/@/layout/components/footer/index.vue')),
    },
    setup() {
      const { prefixCls } = useDesign('default-layout');
      generatorDynamicRouter();
      /* getMenusDate().then(res=>{  
        const {success, content} = res.data; 
        if(success){
            
           generatorDynamicRouter(content)
          } 
          }).then(err=>{}) */
      return {
        prefixCls,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .#{$namespace}-default-layout--sidebar {
    height: inherit;
    min-height: inherit;
  }
</style>
