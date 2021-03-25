<template>
  <div :class="prefixCls">
    <el-aside :class="[`${prefixCls}-wrapper`]" :width="isCollapse ? '64px' : '240px'">
      <AppLogo :showTitle="!isCollapse" />
      <el-menu
        :collapse="isCollapse"
        :uniqueOpened="true"
        default-active="1-1"
        :class="`${prefixCls}-aside`"
        background-color="transparent"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse-transition="false"
      >
        <el-submenu index="1">
          <template #title>
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
          <el-menu-item index="1-3">选项3</el-menu-item>
          <el-menu-item index="1-4">选项4</el-menu-item>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <template #title>导航二</template>
        </el-menu-item>
      </el-menu>
    </el-aside>
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { appStore } from '/@/store/modules/app';
  import { routeStore } from '/@/store/modules/route';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { AppLogo } from '/@/components/Applications';
 
  export default defineComponent({
    name: 'LayoutSider',
    components: { AppLogo },
    setup() {
      const $routes = useRouter();
      const isCollapse = computed(() => appStore.isCollapse);
      const { prefixCls } = useDesign('layout-sider');
      const routes = computed(() => routeStore.getRoutes);

      onMounted(() => {
        setTimeout(() => {
          console.log($routes, '3', routes);
        }, 1000);
      });

      return {
        isCollapse,
        prefixCls,
      };
    },
  });
</script>
<style lang="scss" scoped>
  @mixin set-menu-item($backgroun, $color) {
    background-color: $backgroun !important;
    color: $color !important;
  }
  .#{$namespace}-layout-sider {
    background: var(--sider-dark-bg-color);
    height: inherit;
    &-wrapper {
      height: inherit;
    }
    &-aside {
      border-right: none;

      .el-submenu__title,
      .el-submenu__title i,
      .submenu__title span {
        background: transparent;
      }

      ::v-deep(.el-submenu .el-menu-item),
      ::v-deep(.el-menu-item),
      ::v-deep(.el-submenu__title) {
        height: 46px;
        line-height: 46px;
        & i {
          color: $--color-white !important;
        }
        &:not(.is-active):hover {
          @include set-menu-item(rgb(217, 236, 255), $--color-primary);
          & i {
            color: $--color-primary !important;
          }
        }
      }
      ::v-deep(.el-menu-item) {
        &.is-active {
          @include set-menu-item(#0960bd, $--color-white);
        }
      }
    }
  }
</style>
