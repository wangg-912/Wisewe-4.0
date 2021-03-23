<template>
  <el-main :class="[prefixCls, getLayoutContentMode]">
    <transition name="fade">
      <!-- <router-view /> -->
      <Loading
        v-if="getOpenPageLoading"
        :loading="getPageLoading"
        background="rgba(240, 242, 245, 0.6)"
        absolute
        :class="`${prefixCls}-loading`"
      />
    </transition>
    <PageLayout />
  </el-main>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign'
  import { useRootSetting } from '/@/hooks/setting/useRootSetting';
  import { useTransitionSetting } from '/@/hooks/setting/useTransitionSetting';
  import { Loading } from '/@/components/Loading';
  import PageLayout from '/@/layout/page/index.vue';
  export default defineComponent({
    name: 'LayoutContent',
    components: { PageLayout, Loading },
    setup() {
      const { prefixCls } = useDesign('layout-container');
      const { getOpenPageLoading } = useTransitionSetting();
      const { getLayoutContentMode, getPageLoading } = useRootSetting();
      return {
        prefixCls,
        getOpenPageLoading,
        getLayoutContentMode,
        getPageLoading,
      }
    }
  });
</script>
<style lang="scss" scoped>

  .#{$namespace}-layout-container{
    flex-direction: row;
    padding: 8px !important;
  }

</style>
