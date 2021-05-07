<template>
  <div :class="`${prefixCls}`">
    <el-color-picker v-model="getThemeColor" :predefine="colorList" @change="handleChange" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType, computed, reactive, unref, watch, onMounted, nextTick } from 'vue';
  import { useRootSetting } from '/@/hooks/setting/useRootSetting';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { baseHandler } from '../handler';
  import { HandlerEnum } from '../enums';
  import * as elePackage from 'element-plus/package.json';
  import { generateColors } from '/@/utils/color';
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
      const { prefixCls } = useDesign('app-theme');
      const { getThemeColor } = useRootSetting();
      const { version } = elePackage;
      const primaryColor = computed(() => unref(getThemeColor));
      const defaultUrl = `/src/assets/theme/index.css`;
      const themeUrl = `https://unpkg.zhimg.com/element-plus@${version}/lib/theme-chalk/index.css`;
      const colors = Object.assign(
        {},
        { primary: primaryColor.value },
        generateColors(primaryColor.value)
      );
      const state = reactive({
        originalStylesheetCount: -1, //记录当前已引入style数量
        originalStyle: '', //获取拿到的.css的字符串
      });

      function handleChange(color: string) {
        writeNewStyle();
        props.event && baseHandler(props.event, color);
      }
      function writeNewStyle() {
        let cssText = state.originalStyle;
        Object.keys(colors).forEach((key) => {
          cssText = cssText.replace(new RegExp('(:|\\s+)' + key, 'g'), '$1' + colors[key]);
        });
        // 如果之前没有插入就插入
        if (state.originalStylesheetCount === document.styleSheets.length) {
          const style = document.createElement('style');
          style.innerText = '.primaryColor{background-color:' + colors.primary + '}' + cssText;
          document.head.appendChild(style);
        } else {
          // 如果之前有插入就修改
          document.head.lastChild.innerText =
            '.primaryColor{background-color:' + colors.primary + '} ' + cssText;
        }
      }
      function getIndexStyle(url: string) {
        var request = new XMLHttpRequest();
        request.open('GET', url);
        request.onreadystatechange = function () {
          if (request.readyState === 4 && (request.status == 200 || request.status == 304)) {
            // 调用本地的如果拿不到会得到html,html是不行的
            if (request.response && !/DOCTYPE/gi.test(request.response)) {
              state.originalStyle = getStyleTemplate(request.response);
              writeNewStyle();
            } else {
              state.originalStyle = '';
            }
          } else {
            state.originalStyle = '';
          }
        };
        request.send(null);
      }

      function getStyleTemplate(data: any) {
        const colorMap = {
          '#3a8ee6': 'shade-1',
          '#409eff': 'primary',
          '#53a8ff': 'light-1',
          '#66b1ff': 'light-2',
          '#79bbff': 'light-3',
          '#8cc5ff': 'light-4',
          '#a0cfff': 'light-5',
          '#b3d8ff': 'light-6',
          '#c6e2ff': 'light-7',
          '#d9ecff': 'light-8',
          '#ecf5ff': 'light-9',
        };
        Object.keys(colorMap).forEach((key) => {
          const value = colorMap[key];
          data = data.replace(new RegExp(key, 'ig'), value);
        });
        return data;
      }
      onMounted(() => {
        getIndexStyle(themeUrl);
        setTimeout(() => {
          if (state.originalStyle) {
            return;
          } else {
            getIndexStyle(defaultUrl);
          }
        }, 0);

        nextTick(() => {
          // 获取页面一共引入了多少个style 文件
          state.originalStylesheetCount = document.styleSheets.length;
        });
      });

      return {
        prefixCls,
        getThemeColor,
        handleChange,
      };
    },
  });
</script>
