<template>
  <div :class="prefixCls">
    <el-aside :class="[`${prefixCls}-wrapper`]" :width="isCollapse ? '64px' : '240px'">
      <AppLogo v-if="showLogo" :showTitle="!isCollapse" />
      <el-scrollbar wrap-class='scrollbar-wrapper' :style="{ height:showLogo?'calc(100% - 50px)':'100%'}">
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
          <menu-items v-for="v in menuLists" :key="v.name" :menu="v" :index="v.path" />
        </el-menu>
      </el-scrollbar>
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
  import MenuItems from './menus.vue';
 
  export default defineComponent({
    name: 'LayoutSider',
    components: { AppLogo, MenuItems },
    setup() {
      const $routes = useRouter();
      const isCollapse = computed(() => appStore.isCollapse);
      const showLogo = computed(()=> appStore.getProjectConfig.showLogo);
      const { prefixCls } = useDesign('layout-sider');
      const menuLists = computed(() => routeStore.getRoutes);

      onMounted(() => {
        setTimeout(() => {
          console.log($routes, '3');
        }, 1000);
      });

      return {
        isCollapse,
        showLogo,
        prefixCls,
        menuLists,
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
