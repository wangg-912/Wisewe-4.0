<template>
  <div :class="[`${prefixCls}`, `${prefixCls}--${theme}`]">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="bc in bcLists" :key="bc.path">
        <span v-if="getShowBreadCrumbIcon">
          <font-icon :type="bc.meta.icon" size="14" closely />
        </span>
        {{bc.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script lang="ts">
  import { defineComponent, watch, toRefs, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { useRootSetting } from '/@/hooks/setting/useRootSetting';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { propTypes } from '/@/utils/propTypes';
  import FontIcon from '/@/components/FontIcon/index.vue';
  export default defineComponent({
    name: 'BreadCrumb',
    props: {
      theme: propTypes.oneOf(['dark', 'light']),
    },
    components:{ FontIcon },
    setup() {
      const { getShowBreadCrumbIcon } = useRootSetting();
      const { prefixCls } = useDesign('layout-breadcrumb');
      const state = reactive({
        bcLists:[
          {
            path: 'home',
            name: 'Home',
            meta: {
              title: '首页',
              icon: 'el-icon-s-home',
              affix: true,
            }
          }
        ]
      })
      const useRouterCurrent = reactive(useRouter());
      watch(useRouterCurrent, (o) => {
        const { matched } = o.currentRoute;
        state.bcLists = [...matched];
      } )
      return {
        prefixCls,
        getShowBreadCrumbIcon,
        ...toRefs(state),
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
