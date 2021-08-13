<template>
  <el-button type="primary" @click="openDialogOne">测试IFrame模态窗</el-button>
  <el-button type="primary" @click="openDialogTwo">测试Component模态窗</el-button>
  <el-button type="primary" @click="openDialogThree">测试无参数模态窗</el-button>
  <BasicDialog @register="register1" @cancel="testCancel" @save="testSave">
    <!-- <template #insertFooter>
      <el-button type="primary" plain icon="el-icon-message" @click="testHandler"
        >插入左边</el-button
      >
    </template>
    <template #centerFooter>
      <el-button type="primary" round>插入中间</el-button>
    </template>
    <template #appendFooter>
      <el-button type="primary" @click="testHandler">插入右边</el-button>
    </template> -->
  </BasicDialog>
  <BasicDialog @register="register2" @cancel="testCancel" @save="testCpSave"
    >Components组件</BasicDialog
  >
  <BasicDialog @register="register3" @cancel="testCancel">无参数模态窗</BasicDialog>

  <el-row>
    <el-col :span="24"
      ><div class="grid-content" ref="gridContent"> <DialogExtend /></div
    ></el-col>
  </el-row>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicDialog, useDialog } from '/@/components/Dialog';
  export default defineComponent({
    components: { BasicDialog },
    setup() {
      const [register1, { openDialog: openDailog1 }] = useDialog();
      const [register2, { openDialog: openDailog2 }] = useDialog();
      const [register3, { openDialog: openDailog3 }] = useDialog();
      function openDialogOne() {
        /* renderAsyncDialog(); */
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
      function openDialogTwo() {
        openDailog2({
          loading: false,
          title: '修改',
          showClose: false,
          indata: { name: 'zs', age: '28' },
        });
      }
      function testHandler() {
        // TODO
      }
      function openDialogThree() {
        openDailog3();
      }
      function testCancel() {
        console.log('关闭');
      }
      function testSave(obj) {
        console.log(obj, '保存操作');
      }
      function testCpSave() {
        console.log('组件模态窗确认关闭 ，ok');
      }
      return {
        register1,
        register2,
        register3,
        openDailog1,
        openDailog2,
        openDialogOne,
        openDialogTwo,
        openDialogThree,
        testCancel,
        testSave,
        testCpSave,
        testHandler,
      };
    },
  });
</script>
