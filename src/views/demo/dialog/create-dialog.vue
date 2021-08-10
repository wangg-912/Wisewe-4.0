<template>
  <BasicDialog @register="register1" @cancel="testCancel" @save="testSave">
  </BasicDialog>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicDialog, useDialog } from '/@/components/Dialog';
  export default defineComponent({
    components: { BasicDialog },
    setup(porps) {
      const [register1, { openDialog: openDailog1 }] = useDialog();
      function openDialogOne() {
        openDailog1({
          title: '新增',
          titleIcon: 'el-icon-document-add',
          width: 720,
          height: 500,
          url: `/src/html/test.html?t=${+new Date()}&id=123`,
          indata: {
            data: {
              type: 'add',
              id: '100121210',
              infos: {
                name: '测试一下',
              },
            },
          },
          callback: function (data) {
            console.log('回调事件', data);
          },
        });
      }
      function testCancel() {
        console.log('关闭');
      }
      function testSave(obj) {
        console.log(obj, '保存操作');
      }
      return {
        register1,
        openDialogOne,
        testCancel,
        testSave,
      };
    },
  });
</script>
