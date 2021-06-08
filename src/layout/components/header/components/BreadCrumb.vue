<template>
  <div :class="['wisewe-layout-header-breadcrumb', `wisewe-layout-header-breadcrumb--${theme}`]">
    <el-breadcrumb>
      <el-breadcrumb-item v-for="(bc, index) in currentRoute.matched" :key="index">
        <span v-if="getShowBreadCrumbIcon">
          <font-icon :type="bc.meta.icon" size="14" closely />
        </span>
        <span v-if="bc.meta && bc.meta.title" class="bc-title">{{ bc.meta.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { propTypes } from '/@/utils/propTypes';
  import { useRootSetting } from '/@/hooks/setting/useRootSetting';
  import { useRouter } from 'vue-router';
  import FontIcon from '/@/components/FontIcon/index.vue';
  export default defineComponent({
    name: 'BreadCrumb',
    props: {
      theme: propTypes.oneOf(['dark', 'light']),
    },
    components:{ FontIcon },
    setup() {
      const { getShowBreadCrumbIcon } = useRootSetting();
      const { currentRoute } = useRouter();
      return {
        getShowBreadCrumbIcon,
        currentRoute,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .#{$namespace}-layout-header-breadcrumb {
    margin-top: -1px;
    ::v-deep(.el-breadcrumb__inner.is-link),
    ::v-deep(.el-breadcrumb__inner a) {
      font-weight: 400 !important;
    }
    ::v-deep(.el-breadcrumb__separator) {
      margin: 0 2px !important;
    }
    .bc-title{
      font-size: 12px;
      padding-left: 2px;
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
