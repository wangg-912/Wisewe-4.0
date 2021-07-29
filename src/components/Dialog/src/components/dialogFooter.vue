<template>
  <div>
    <slot name="insertFooter"></slot>
    <el-button type="info" @click="handleCancel" v-if="showCancelBtn">
      {{ cancelText }}
    </el-button>
    <slot name="centerFooter"></slot>
    <el-button :type="okType" @click="handleOk" v-if="showOkBtn"> {{ okText }}</el-button>
    <slot name="appendFooter"></slot>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { basicProps } from '../props';
  export default defineComponent({
    name: 'DialogFooter',
    props: basicProps,
    emits: ['save', 'close'],
    setup(props, { emit }) {
      console.log(props);
      function handleOk() {
        emit('save');
      }

      function handleCancel() {
        emit('close');
      }
      return { handleOk, handleCancel };
    },
  });
</script>
