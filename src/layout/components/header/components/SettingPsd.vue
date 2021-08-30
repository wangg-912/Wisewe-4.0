<template>
  <div style="padding: 16px 24px 16px 10px">
    <el-form
      status-icon
      :rules="rulesOptions"
      ref="psdFormRef"
      label-width="70px"
      size="small"
      class="psd-container"
    >
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="userName" disabled></el-input>
      </el-form-item>
      <el-form-item label="原密码" prop="oldPsd">
        <el-input type="password" v-model="oldPsd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPsd">
        <el-input type="password" v-model="newPsd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkNewPsd">
        <el-input type="password" v-model="checkNewPsd" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  export default defineComponent({
    name: 'SettingPsd',
    setup() {
      const psdFormRef = ref(null);
      const userName = ref('');
      const oldPsd = ref('');
      const newPsd = ref('');
      const checkNewPsd = ref('');

      const validNewPsd = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入新密码'));
        } else {
          if (checkNewPsd.value !== '') {
            psdFormRef.value.validateField('checkNewPsd');
          }
          callback();
        }
      };
      const validConfirmPsd = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请再次输入密码'));
        } else if (value !== newPsd.value) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      const rulesOptions = {
        oldPsd: [{ required: true, trigger: 'blur', message: '原密码不能为空' }],
        newPsd: [
          {
            required: true,
            validator: validNewPsd,
            trigger: 'blur',
            message: '新密码不能为空',
          },
        ],
        checkNewPsd: [
          {
            required: true,
            validator: validConfirmPsd,
            trigger: 'blur',
            message: '两次输入密码不一致',
          },
        ],
      };
      const submitForm = () => {
        psdFormRef.value.validate((valid) => {
          if (valid) {
           /* TODO */
          } else {
            /* TODO */
            return false;
          }
        });
      };
      var resetForm = () => {
        psdFormRef.value.resetFields();
      };

      return {
        userName,
        oldPsd,
        newPsd,
        checkNewPsd,
        rulesOptions,
        psdFormRef,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .psd-container {
    ::v-deep(.el-form-item--small) {
      .el-form-item__label {
        font-size: 12px !important;
      }
    }
  }
</style>
