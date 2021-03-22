<template>
  <el-footer :class="prefixCls">
    版权所有@2019-2021 成都中教智汇信息技术有限公司.保留一切权利. &copy;
    <a href="https://beian.miit.gov.cn/" target="_blank">蜀ICP备19032456号-2</a>
  </el-footer>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  export default defineComponent({
    name: 'Footer',
    setup() {
      const { prefixCls } = useDesign('layout-footer');
      return {
        prefixCls,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .#{$namespace}-layout-footer {
    height: 30px !important;
    text-align: center;
    font-size: $--font-size-small;
    a {
      color: $--color-primary;
    }
  }
</style>
