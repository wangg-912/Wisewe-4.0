<template>
  <div :class="{ active: isActive, 'text-danger': hasError }">
    <el-button type="primary" icon="el-icon-edit" @click="removeCount">-</el-button>
    {{ getcount }}
    <el-button type="primary" @click="addCount">
      <svg-icon type="icon-Word" />
      +</el-button>
    <span>
      <label>{{ status }}</label>
      <el-button type="primary" icon="el-icon-edit" @click="toggleState">切换状态</el-button>

      <el-button type="primary" icon="el-icon-edit" @click="testThrottle">测试节流</el-button>
    </span>
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
  import { defineComponent, computed, onMounted, reactive, toRefs } from 'vue';
  import { appStore } from '/@/store/modules/app';
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
      const getcount = computed(() => appStore.getCount);
      const status = computed(() => appStore.getStatus);
      const state = reactive({
        formInline: {
          user: '',
          region: ''
        }
      })
      const addCount = () => {
        let count = getcount.value + 1;
        appStore.setCount(count);
      };

      const toggleState = () => {
        appStore.updateState(!status.value);
      };
      const removeCount = () => {
        let count = getcount.value - 1;
        appStore.setCount(count <= 0 ? 0 : count);
      };

      const testThrottle = () => {
        testApi();
        testform();
      };

      onMounted(() => {});

      function testApi() {
        login({ username: 'zhangsan', password: '1233' }).then((res: object) => {});
      }
      function testform() {
        testpostform({ username: 'zhangsan', password: '245' }).then((res: object) => {});
      }
      function onSubmit() {
        console.log('submit!');
      }

      return { status, getcount, addCount, toggleState, removeCount, testThrottle, ...toRefs(state),onSubmit};
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
