<template>
  <el-color-picker v-model="theme" :predefine="colorList" @change="handleChange" />
</template>
<script lang="ts">
  import { defineComponent, PropType, computed, reactive, toRefs, unref, watch } from 'vue';
  import { useRootSetting } from '/@/hooks/setting/useRootSetting';
  import { ElMessage } from 'element-plus';
  import * as elePackage from 'element-plus/package.json';
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
      const { getThemeColor } = useRootSetting();
      const { version } = elePackage;
      const ORIGINAL_THEME = unref(getThemeColor);
      const state = reactive({
        chalk: '', // content of theme-chalk css
        theme: '',
      });
      const _theme = computed(() => unref(getThemeColor));

      state['theme'] = _theme;
      /* onMounted(()=>{
        changeTheme(unref(getThemeColor));
      }) */
      function handleChange(color: string) {
        
        props.event && baseHandler(props.event, color);
      }
      watch(()=>state.theme,(val,oldVal)=>{
        changeTheme(val,oldVal);
      })
      function changeTheme(val: string, old: string) {
        const oldVal = state.chalk ? val : old;
        async function _theme() {
          const themeCluster = getThemeCluster(val.replace('#', ''));
          const originalCluster = getThemeCluster(oldVal.replace('#', ''));
          /*  console.log(themeCluster, originalCluster); */

          const getHandler = (variable: string, id: string) => {
            return () => {
              const originalCluster = getThemeCluster(unref(getThemeColor).replace('#', ''));
              const newStyle = updateStyle(state[variable], originalCluster, themeCluster);

              let styleTag = document.getElementById(id);
              if (!styleTag) {
                styleTag = document.createElement('style');
                styleTag.setAttribute('id', id);
                document.head.appendChild(styleTag);
              }
              styleTag.innerText = newStyle;
            };
          };

          if (!state.chalk) {
            const url = `https://unpkg.zhimg.com/element-plus@${version}/lib/theme-chalk/index.css`;
            await getCSSString(url, 'chalk');
          }
          const chalkHandler = getHandler('chalk', 'chalk-style');
          chalkHandler();

          ElMessage.success({
            message: ' 系统主题切换成功！',
            type: 'success',
          });
        }
        _theme();
      }

      function updateStyle(style: any, oldCluster: any[], newCluster: { [x: string]: any }) {
        let newStyle = style;
        oldCluster.forEach((color, index) => {
          newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index]);
        });
        return newStyle;
      }

      function getCSSString(url: string, variable: string | number) {
        return new Promise<void>((resolve) => {
          const xhr = new XMLHttpRequest();
          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
              state[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '');
              resolve();
            }
          };
          xhr.open('GET', url);
          xhr.send();
        });
      }

      function getThemeCluster(theme: string) {
        const tintColor = (color: string, tint: number) => {
          let red = parseInt(color.slice(0, 2), 16);
          let green = parseInt(color.slice(2, 4), 16);
          let blue = parseInt(color.slice(4, 6), 16);

          if (tint === 0) {
            // when primary color is in its rgb space
            return [red, green, blue].join(',');
          } else {
            red += Math.round(tint * (255 - red));
            green += Math.round(tint * (255 - green));
            blue += Math.round(tint * (255 - blue));

            const r = red.toString(16);
            const g = green.toString(16);
            const b = blue.toString(16);

            return `#${r}${g}${b}`;
          }
        };

        const shadeColor = (color: string, shade: number) => {
          let red = parseInt(color.slice(0, 2), 16);
          let green = parseInt(color.slice(2, 4), 16);
          let blue = parseInt(color.slice(4, 6), 16);

          red = Math.round((1 - shade) * red);
          green = Math.round((1 - shade) * green);
          blue = Math.round((1 - shade) * blue);

          const r = red.toString(16);
          const g = green.toString(16);
          const b = blue.toString(16);

          return `#${r}${g}${b}`;
        };

        const clusters = [theme];
        for (let i = 0; i <= 9; i++) {
          clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
        }
        clusters.push(shadeColor(theme, 0.1));
        return clusters;
      }

      return {
        ...toRefs(state),
        handleChange,
      };
    },
  });
</script>
