<template>
  <div :class="{ active: isActive, 'text-danger': hasError }">
    <el-button type="primary"><svg-icon type="icon-Word" />SVG</el-button>
    <font-icon type="iconfont icon-pingjiao" size="12" color="red" />
    <font-icon type="" size="12" color="red" />
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="审批人">
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, reactive, toRefs } from 'vue';
  import { login, testpostform } from '/@/api/app';
  import SvgIcon from '/@/components/SvgIcon/index.vue'
  import FontIcon from '/@/components/FontIcon/index.vue'

  export default defineComponent({
    name: 'HelloWorld',
    props: {},
    components:{
      SvgIcon,
      FontIcon,
    },
    setup() {
     
      const state = reactive({
        formInline: {
          user: '',
          region: ''
        }
      })
      

      onMounted(() => {});

      function onSubmit() {
        console.log('submit!');
      }

      return { ...toRefs(state), onSubmit};
    },
    data() {
      return {
        isActive: true,
        hasError: true,
      };
    },
  });
</script>

<style scoped>
  a {
    color: #42b983;
  }

  label {
    margin: 0 0.5em;
    font-weight: bold;
  }

  code {
    padding: 2px 4px;
    color: #304455;
    background-color: #eee;
    border-radius: 4px;
  }
</style>
