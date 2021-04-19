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
          style="fontSize: 14px"
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
  import { invertColor } from '/@/utils/color'
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
      /* debugger; */
      const { prefixCls } = useDesign('setting-theme-picker');

      function handleClick(color: string) {
        props.event && baseHandler(props.event, color);
      }

      function transformColor(color: string){
        console.log(invertColor(color));
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
      border: 1px solid #ddd;
      border-radius: 4px;
      cursor: pointer;
    }
    &__item {
      width: 18px;
      height: 18px;
      display: flex;
      margin: 3px;
      border-radius: 2px;
      align-items: center;
      justify-content: center;
      &--active {
      }
    }
  }
</style>
