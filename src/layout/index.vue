<template>
  <!-- 默认排版 -->
  <el-container
    v-if="siderType == 'sidebar'"
    :class="[`${prefixCls}--sidebar`, `${prefixCls}--${siderType}`]"
  >
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
  <el-container
    v-if="siderType == 'mix'"
    direction="vertical"
    :class="[`${prefixCls}--sidebar`, `${prefixCls}--${siderType}`]"
  >
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
  <el-container
    v-if="siderType == 'top-menu'"
    direction="vertical"
    :class="[`${prefixCls}--sidebar`, `${prefixCls}--${siderType}`]"
  >
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
  import { defineComponent, computed, unref, ref, reactive, watch } from 'vue';
  import type { RouteRecordRaw } from 'vue-router';
  import { useRouter } from 'vue-router';
  import { createAsyncComponent } from '/@/utils/factory/asyncComponents';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
  import { useTagSetting } from '/@/hooks/setting/useTagSetting';
  import { routeStore } from '/@/store/modules/route';
  import { useAppInject } from '/@/hooks/web/useAppInject';
  import { useRootSetting } from '/@/hooks/setting/useRootSetting';
  import { useFiles } from '/@/hooks/theme/useFiles';
  import { writeNewStyle, getStyleTemplate, generateColors } from '/@/utils/themeColor';
  import { getMenusDate } from '/@/api/app';
  
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
      const { push, addRoute, currentRoute } = useRouter();
      const redirect = ref<string>('');
      const fonts = ref(null);
      const styleFiles = ref(null);
      const originalStyle = ref('');
      const { getThemeColor } = useRootSetting();
      const { prefixCls } = useDesign('default-layout');
      const { getShowMenu, getMenuType } = useMenuSetting();
      const { getIsMobile } = useAppInject();
      const { getTagsShow } = useTagSetting();
      const { getIndexStyle, getSeparatedStyles } = useFiles();
      const siderType = computed(() => unref(getMenuType));
      const colors = reactive({
        primary: '#409eff',
      });
      /* generatorDynamicRouter(); */
      const originalStylesheetCount = computed(() => {
        return document.styleSheets.length || -1;
      });
      /**
       * ==============初始化主题使用================== *
       */
      /* getFontFiles(fontFiles).then((data) => {
        fonts.value = data;
      }); */

      getIndexStyle().then((data) => {
        originalStyle.value = getStyleTemplate(data);
      });

      getSeparatedStyles().then((data) => {
        styleFiles.value = data.map((file) => {
          return {
            name: file.url,
            data: getStyleTemplate(file.data),
          };
        });
        setTheme();
      });
      function setTheme() {
        colors.primary = getThemeColor.value;
        Object.assign(colors, generateColors(getThemeColor.value));
        writeNewStyle(originalStylesheetCount.value, originalStyle.value, colors);
      }
      /**
       * ==============初始化主题完毕================== *
       */
      watch(
        () => currentRoute.value,
        (route) => {
          redirect.value = (route.query && route.query.redirect) as string;
        },
        {
          immediate: true,
        }
      );
      getMenusDate()
        .then((res) => {
          const { success, content } = res.data;
          if (success) {
            routeStore.GenerateRoutes().then(() => {
              routeStore.addRouters.forEach(async (route: RouteRecordRaw) => {
                await addRoute(route.name!, route); // 动态添加可访问路由表
              });
              routeStore.setIsAddRouters(true);
              push({ path: redirect.value || '/' });
            });
          }
        })
        .then((err) => {});
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

