<template>
  <div :class="getToolCls">
    <template v-if="canFullscreen">
      <i
        class="el-icon-full-screen"
        :class="`${prefixCls}__icon`"
        role="full"
        @click="handleFullScreen"
        v-if="!fullscreen"
      ></i>
      <i
        class="el-icon-crop"
        :class="`${prefixCls}__icon`"
        role="close"
        @click="handleFullScreen"
        v-else
      ></i>
    </template>
    <i
      v-if="showClose"
      class="el-icon-close"
      :class="`${prefixCls}__icon`"
      @click="handleCancel"
    ></i>
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { propTypes } from '/@/utils/propTypes';
  export default defineComponent({
    name: 'DialogToolbar',
    props: {
      showClose: propTypes.bool.def(true),
      canFullscreen: propTypes.bool.def(true),
      fullscreen: propTypes.bool,
    },
    emits: ['close', 'fullscreen'],

    setup(props, { emit }) {
      const { prefixCls } = useDesign('basic-modal-toolbar');
      const getToolCls = computed(() => {
        return [
          prefixCls,
          `${prefixCls}--custom`,
          { [`${prefixCls}--can-full`]: props.canFullscreen },
        ];
      });
      /**
       * @description 关闭模态窗
       */
      function handleCancel() {
        emit('close');
      }
      /**
       * @description 切换全屏事件
       */
      function handleFullScreen(e: Event) {
        e?.stopPropagation();
        e?.preventDefault();
        emit('fullscreen');
      }
      return {
        getToolCls,
        prefixCls,
        handleCancel,
        handleFullScreen,
      };
    },
  });
</script>
