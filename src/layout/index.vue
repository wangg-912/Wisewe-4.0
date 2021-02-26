<template>
<el-container>
    <LayoutFeatures />
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
         <router-view />
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
 
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import {createAsyncComponent} from '/@/utils/factory/asyncComponents'
  export default defineComponent({
    name: 'Layout',
    components:{
      LayoutFeatures: createAsyncComponent(() => import('/@/layout/components/feature/index.vue'))
    }
  });
</script>
