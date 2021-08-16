<template>
  <div :class="`${prefixCls}`">
    <el-color-picker v-model="getThemeColor" :predefine="colorList" @change="handleChange" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType, computed, reactive, ref } from 'vue';
  import { useRootSetting } from '/@/hooks/setting/useRootSetting';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useFiles } from '/@/hooks/theme/useFiles';
  import { writeNewStyle, getStyleTemplate, generateColors } from '/@/utils/themeColor';
  import { baseHandler } from '../handler';
  import { HandlerEnum } from '../enums';
  export default defineComponent({
    name: 'AppTheme',
    props: {
      colorList: {
        type: Array as PropType<string[]>,
        defualt: [],
      },
      event: {
        type: Number as PropType<HandlerEnum>,
        default: () => {},
      },
    },
    setup(props) {
      /* const fonts = ref(null); */
      const styleFiles = ref(null);
      const originalStyle = ref('');
      const { getIndexStyle, getSeparatedStyles } = useFiles();
      const { prefixCls } = useDesign('app-theme');
      const { getThemeColor } = useRootSetting();
      const colors = reactive({
        primary: getThemeColor.value,
      });
      const originalStylesheetCount = computed(() => {
        return document.styleSheets.length || -1;
      });

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
      });
      function handleChange(color: string) {
        props.event && baseHandler(props.event, color);
        colors.primary = color;
        Object.assign(colors, generateColors(color));
        writeNewStyle(originalStylesheetCount.value, originalStyle.value, colors);
      }
      return {
        prefixCls,
        getThemeColor,
        handleChange,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .#{$namespace}-app-theme {
    display: flex;
    justify-content: center;
  }
</style>
