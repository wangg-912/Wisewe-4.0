<template>
  <div :class="prefixCls">
    <span v-for="color in colorList || []" :key="color" :class="[`${prefixCls}__box`]">
      <span
        @click="handleClick(color)"
        :class="[
          `${prefixCls}__item`,
          {
            [`${prefixCls}__item--active`]: def === color,
          },
        ]"
        :style="{ background: color }"
      >
        <i
          v-if="def === color"
          class="el-icon-check"
          style="font-size: 14px"
          :style="{ color: transformColor(color) }"
        ></i>
      </span>
    </span>
    <!--  <el-color-picker v-model="def" /> -->
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { baseHandler } from '../handler';
  import { HandlerEnum } from '../enums';
  import { invertColor } from '/@/utils/color';
  export default defineComponent({
    name: 'ThemePicker',
    props: {
      colorList: {
        type: Array as PropType<string[]>,
        defualt: [],
      },
      event: {
        type: Number as PropType<HandlerEnum>,
        default: () => {},
      },
      def: {
        type: String,
      },
    },
    setup(props) {
      const { prefixCls } = useDesign('setting-theme-picker');
      /**
       * @description 主题切换事件入口
       * @param {String} color 颜色值 十六进制
       */
      function handleClick(color: string) {
        props.event && baseHandler(props.event, color);
      }
      /**
       * @description 对冲颜色转化器
       * @param {String} color 颜色值 十六进制
       * @returns {String} 对冲色
       */
      function transformColor(color: string) {
        return invertColor(color);
      }

      return {
        prefixCls,
        handleClick,
        transformColor,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .#{$namespace}-setting-theme-picker {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    margin: 16px 0;
    justify-content: space-around;

    &__box {
      width: 24px;
      height: 24px;
      cursor: pointer;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    &__item {
      display: flex;
      width: 18px;
      height: 18px;
      margin: 2px;
      border-radius: 2px;
      align-items: center;
      justify-content: center;
    }
  }
</style>
