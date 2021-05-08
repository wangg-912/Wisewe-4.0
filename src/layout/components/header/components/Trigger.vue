<template>
  <div
    :class="[`${prefixCls}`, `${prefixCls}--${theme}`]"
    :collapse="isCollapse"
    @click="toggleCollapsed"
  >
    <i class="el-icon-s-fold" :class="isCollapse ? 'el-icon--collapse' : 'el-icon--expend'"></i>
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed, unref } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
  import { propTypes } from '/@/utils/propTypes';
  export default defineComponent({
    name: 'LayoutTrigger',
    props: {
      theme: propTypes.oneOf(['dark', 'light']),
    },
    setup() {
      const { prefixCls } = useDesign('layout-header-trigger');
      const { getCollapsed, toggleCollapsed } = useMenuSetting();
      const isCollapse = computed(() => unref(getCollapsed));
      return {
        prefixCls,
        isCollapse,
        toggleCollapsed,
      };
    },
  });
</script>
<style lang="scss" scoped>
  @mixin turnRotate($ease, $tf) {
    transition: $ease $tf;
  }
  .#{$namespace}-layout-header-trigger {
    padding: 0 12px;
    i {
      font-size: 16px;
      cursor: pointer;
      &.el-icon--expend {
        transform: rotate(0deg);
        @include turnRotate(200ms, $ease-in);
      }
      &.el-icon--collapse {
        transform: rotate(90deg);
        transition: 200ms $ease-in;
      }
    }
    &--dark {
      .el-icon-s-fold {
        color: $trigger-light-bg-color;
        &:hover {
          color: $trigger-light-hover-bg-color;
        }
      }
    }
    &--light {
      .el-icon-s-fold {
        color: $trigger-dark-bg-color;
        &:hover {
          color: $trigger-dark-hover-bg-color;
        }
      }
    }
  }
</style>
