<template>
  <el-footer v-if="getShowFooter" :class="prefixCls">
    版权所有@2019-2021 成都中教智汇信息技术有限公司.保留一切权利. &copy;
    <a href="https://beian.miit.gov.cn/" target="_blank">蜀ICP备19032456号-2</a>
  </el-footer>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useRootSetting } from '/@/hooks/setting/useRootSetting';
  export default defineComponent({
    name: 'Footer',
    setup() {
      const { prefixCls } = useDesign('layout-footer');
      const { getShowFooter } = useRootSetting();
      return {
        prefixCls,
        getShowFooter,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .#{$namespace}-layout-footer {
    height: 30px !important;
    font-size: $--font-size-small;
    text-align: center;

    a {
      color: $--color-primary;
    }
  }
</style>
