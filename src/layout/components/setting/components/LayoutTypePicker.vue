<template>
  <div :class="prefixCls">
    <template v-for="item in layoutTypeList || []" :key="item.title">
      <el-tooltip class="item" effect="dark" :content="item.title" placement="bottom">
        <div
          @click="handler(item)"
          :class="[
            `${prefixCls}__item`,
            `${prefixCls}__item--${item.type}`,
            {
              [`${prefixCls}__item--active`]: def === item.type,
            },
          ]"
        >
          <div class="mix-sidebar"></div>
        </div>
      </el-tooltip>
    </template>
  </div>
</template>
<script lang="ts">
  import { defineComponent, watchEffect, PropType, ref } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { menuTypeList } from '../enums';
  export default defineComponent({
    name: 'LayoutTypePicker',
    props: {
      menuTypeList: {
        type: Array as PropType<typeof menuTypeList>,
        default: () => [],
      },
      handler: {
        type: Function as PropType<Fn>,
        default: () => {},
      },
      def: {
        type: String,
        default: '',
      },
    },
    setup(props) {
      let layoutTypeList: [] = ref([]);

      const { prefixCls } = useDesign('setting-layout-type-picker');

      watchEffect(() => {
        layoutTypeList = [...menuTypeList];
      });

      return {
        prefixCls,
        layoutTypeList,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .#{$namespace}-setting-layout-type-picker {
    display: flex;
    justify-content: center;
    &__item {
      position: relative;
      width: 56px!important;
      height: 48px!important;
      margin-right: 16px;
      overflow: hidden;
      cursor: pointer;
      background-color: #f0f2f5;
      border-radius: 4px;
      box-shadow: 0 1px 2.5px 0 rgba(0, 0, 0, 0.18);

      &::before,
      &::after {
        position: absolute;
        content: '';
      }

      &--sidebar {
        &::before {
          top: 0;
          left: 0;
          z-index: 1;
          width: 33%;
          height: 100%;
          background-color: #273352;
          border-radius: 4px 0 0 4px;
        }

        &::after {
          top: 0;
          left: 0;
          width: 100%;
          height: 25%;
          background-color: #fff;
        }
      }

      &--mix {
        &::before {
          top: 0;
          left: 0;
          width: 33%;
          height: 100%;
          background-color: #fff;
          border-radius: 4px 0 0 4px;
        }

        &::after {
          top: 0;
          left: 0;
          z-index: 1;
          width: 100%;
          height: 25%;
          background-color: #273352;
        }
      }

      &--top-menu {
        &::after {
          top: 0;
          left: 0;
          width: 100%;
          height: 25%;
          background-color: #273352;
        }
      }

      &--mix-sidebar {
        &::before {
          top: 0;
          left: 0;
          z-index: 1;
          width: 25%;
          height: 100%;
          background-color: #273352;
          border-radius: 4px 0 0 4px;
        }

        &::after {
          top: 0;
          left: 0;
          width: 100%;
          height: 25%;
          background-color: #fff;
        }

        .mix-sidebar {
          position: absolute;
          left: 25%;
          width: 15%;
          height: 100%;
          background-color: #fff;
        }
      }
      /* &::after {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        content: '';
        opacity: 0;
        transition: all 0.3s;
      } */

      &:hover,
      &--active {
        width: 52px;
        height: 44px;
        border: 2px solid #409eff;

        &::before,
        &::after {
          border-radius: 0;
        }
      }
    }
  }
</style>
