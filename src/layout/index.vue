<template>
  <!-- 默认排版 -->
  <el-container v-if="siderType=='sidebar'" :class="[`${prefixCls}--sidebar`, `${prefixCls}--${siderType}`]">
    <LayoutFeatures />
    <Sider v-if="getShowMenu || getIsMobile" />
    <el-container direction="vertical" :calss="!prefixCls" style="border-left: 1px solid #eee">
      <LayoutHeader fixed />
      <LayoutTags v-if="getTagsShow" />
      <LayoutContent />
      <LayoutFooter />
    </el-container>
  </el-container>
  <!-- Mix排版 -->
  <el-container v-if="siderType=='mix'" direction="vertical" :class="[`${prefixCls}--sidebar`, `${prefixCls}--${siderType}`]">
    <LayoutFeatures />
    <LayoutHeader fixed :siderType="siderType" />
    <el-container>
      <Sider />
      <el-container direction="vertical" style="border-left: 1px solid #eeeeee">
        <LayoutTags v-if="getTagsShow" />
        <LayoutContent />
        <LayoutFooter />
      </el-container>
    </el-container>
  </el-container>
  <!-- TopMenu排版 -->
  <el-container v-if="siderType=='top-menu'" direction="vertical" :class="[`${prefixCls}--sidebar`, `${prefixCls}--${siderType}`]">
    <LayoutFeatures />
    <LayoutHeader fixed :siderType="siderType" />
    <el-container direction="vertical">
      <LayoutTags v-if="getTagsShow" />
      <LayoutContent />
    </el-container>
    <LayoutFooter />
  </el-container>
</template>

<script lang="ts">
  import { defineComponent, computed, unref } from 'vue';
  import { createAsyncComponent } from '/@/utils/factory/asyncComponents';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
  import { useTagSetting } from '/@/hooks/setting/useTagSetting';
  import { generatorDynamicRouter } from '/@/router/asyncRouter'
  import { useAppInject } from '/@/hooks/web/useAppInject';
  import { getMenusDate } from '/@/api/app'
  /* import router from '/@/router'; */
  export default defineComponent({
    name: 'Layout',
    components: {
      LayoutFeatures: createAsyncComponent(() => import('/@/layout/components/feature/index.vue')),
      LayoutHeader: createAsyncComponent(() => import('/@/layout/components/header/index.vue')),
      Sider: createAsyncComponent(() => import('/@/layout/components/aside/sider.vue')),
      LayoutTags: createAsyncComponent(() => import('/@/layout/components/tags/index.vue')),
      LayoutContent: createAsyncComponent(() => import('/@/layout/components/content/index.vue')),
      LayoutFooter: createAsyncComponent(() => import('/@/layout/components/footer/index.vue')),
    },
    setup() {
      const { prefixCls } = useDesign('default-layout');
      const { getShowMenu, getMenuType } = useMenuSetting();
      const { getIsMobile } = useAppInject();
      const { getTagsShow } = useTagSetting();
      const siderType = computed(() => unref(getMenuType));
      /* debugger; */
      generatorDynamicRouter();
      /* getMenusDate().then(res=>{  
        const {success, content} = res.data; 
        if(success){
            
           generatorDynamicRouter(content)
          } 
          }).then(err=>{}) */
      return {
        prefixCls,
        getShowMenu,
        siderType,
        getIsMobile,
        getTagsShow,
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
