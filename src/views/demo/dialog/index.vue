<template>
  <el-button type="primary" @click="openDialogLoading">测试模态窗</el-button>
  <BasicDialog v-bind="$attrs" title="Modal Title" @register="register1"> 123 </BasicDialog>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicDialog, useDialog } from '/@/components/Dialog';
  export default defineComponent({
    components: { BasicDialog },
    setup() {
      const [register1, { openModal: openDailog1, setModalProps }] = useDialog();
      function openDialogLoading() {
        openDailog1();
        setModalProps({ loading: true });
        setTimeout(() => {
          setModalProps({ loading: false });
        }, 650);
      }
      return {
        register1,
        openDailog1,
        openDialogLoading,
      };
    },
  });
</script>
