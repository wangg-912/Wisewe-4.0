<template>
  <div :class="[`${prefixCls}`, `${prefixCls}--${theme}`]">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/404' }">
        <i v-if="getShowBreadCrumbIcon" class="el-icon-bicycle"></i> 活动管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <i v-if="getShowBreadCrumbIcon" class="el-icon-s-home"></i> 活动详情
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useRootSetting } from '/@/hooks/setting/useRootSetting';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { propTypes } from '/@/utils/propTypes';
  export default defineComponent({
    name: 'BreadCrumb',
    props: {
      theme: propTypes.oneOf(['dark', 'light']),
    },
    setup() {
      const { getShowBreadCrumbIcon } = useRootSetting();
      const { prefixCls } = useDesign('layout-breadcrumb');
      return {
        prefixCls,
        getShowBreadCrumbIcon,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .#{$namespace}-layout-breadcrumb {
    margin-top: -1px;
    ::v-deep(.el-breadcrumb__inner.is-link),
    ::v-deep(.el-breadcrumb__inner a) {
      font-weight: 400 !important;
    }
    ::v-deep(.el-breadcrumb__separator) {
      margin: 0 2px !important;
    }

    &--light {
      ::v-deep(.el-breadcrumb__inner),
      ::v-deep(.el-breadcrumb__inner.is-link) {
        color: $breadcrumb-item-normal-color;
      }
      ::v-deep(.el-breadcrumb__inner.is-link:hover) {
        color: rgb(9, 96, 189);
      }
    }
    &--dark {
      ::v-deep(.el-breadcrumb__inner),
      ::v-deep(.el-breadcrumb__inner.is-link) {
        color: rgba(255, 255, 255, 0.6);
      }
      ::v-deep(.el-breadcrumb__inner.is-link:hover) {
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }
</style>
