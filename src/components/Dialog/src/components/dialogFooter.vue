<template>
  <div>
    <slot name="insertFooter"></slot>
    <el-button
      plain
      type="info"
      v-bind="cancelButtonProps"
      @click="handleCancel"
      v-if="showCancelBtn"
    >
      {{ cancelText }}
    </el-button>
    <slot name="centerFooter"></slot>
    <el-button :type="okType" @click="handleOk" v-bind="okButtonProps" v-if="showOkBtn">
      {{ okText }}</el-button
    >
    <slot name="appendFooter"></slot>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { basicProps } from '../props';
  export default defineComponent({
    name: 'DialogFooter',
    props: basicProps,
    emits: ['ok', 'cancel'],
    setup(_, { emit }) {
      function handleOk() {
        emit('ok');
      }

      function handleCancel() {
        emit('cancel');
      }
      return { handleOk, handleCancel };
    },
  });
</script>
