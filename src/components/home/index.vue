<template>
  <div :class="{ active: isActive, 'text-danger': hasError }">
    <el-button type="primary" icon="el-icon-edit" @click="removeCount">-</el-button>
    {{ getcount }}
    <el-button type="primary" icon="el-icon-edit" @click="addCount">+</el-button>
    <span>
      <label>{{ status }}</label>
      <el-button type="primary" icon="el-icon-edit" @click="toggleState">切换状态</el-button>

      <el-button type="primary" icon="el-icon-edit" @click="testThrottle">测试节流</el-button>
    </span>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, onMounted } from 'vue';
  import { appStore } from '/@/store/modules/app';
  import { login, testpostform } from '/@/api/app';

  export default defineComponent({
    name: 'HelloWorld',
    props: {},
    setup() {
      const getcount = computed(() => appStore.getCount);
      const status = computed(() => appStore.getStatus);

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

      return { status, getcount, addCount, toggleState, removeCount, testThrottle };
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
