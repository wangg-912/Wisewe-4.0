<template>
  <div :class="getToolCls">
    <template v-if="canFullscreen">
      <i class="el-icon-full-screen" role="full" @click="handleFullScreen" v-if="fullScreen"></i>
      <i class="el-icon-crop" role="close" @click="handleFullScreen" v-else></i>
    </template>
    <i class="el-icon-close" @click="handleCancel"></i>
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { propTypes } from '/@/utils/propTypes';
  export default defineComponent({
    name: 'DialogToolbar',
    props: {
      canFullscreen: propTypes.bool.def(true),
      fullScreen: propTypes.bool,
    },
    emits: ['cancel', 'fullscreen'],

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
        emit('cancel');
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
