<template>
  <el-button type="primary" @click="openDialogOne">测试IFrame模态窗</el-button>
  <el-button type="primary" @click="openDialogTwo">测试Component模态窗</el-button>
  <BasicDialog @register="register1" @cancel="testCancel" @save="testSave"></BasicDialog>
  <BasicDialog @register="register2" @cancel="testCancel" @save="testCpSave"
    >Components组件</BasicDialog
  >
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicDialog, useDialog } from '/@/components/Dialog';
  export default defineComponent({
    components: { BasicDialog },
    setup() {
      const [register1, { openDialog: openDailog1, setModalProps: setModalProps1 }] = useDialog();
      const [register2, { openDialog: openDailog2, setModalProps: setModalProps2 }] = useDialog();
      function openDialogOne() {
        openDailog1(true, {
          loading: true,
          title: '新增',
          url: '/src/html/test.html?id=123',
          renderFrame: true,
          initData: { name: 'zs', age: '28' },
          callback: function (data) {},
        });
        setTimeout(() => {
          setModalProps1({ loading: false });
        }, 650);
      }
      function openDialogTwo() {
        openDailog2(true, {
          loading: true,
          title: '修改',
          showClose: false,
          initData: { name: 'zs', age: '28' },
        });
        setTimeout(() => {
          setModalProps2({ loading: false });
        }, 650);
      }
      function testCancel() {
        console.log('关闭');
      }
      function testSave(obj) {
        console.log(obj, 'ok');
      }
      function testCpSave() {
        console.log('组件模态窗确认关闭 ，ok');
      }
      return {
        register1,
        register2,
        openDailog1,
        openDailog2,
        openDialogOne,
        openDialogTwo,
        testCancel,
        testSave,
        testCpSave,
      };
    },
  });
</script>
