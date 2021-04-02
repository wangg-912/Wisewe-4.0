<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/404' }">
      <i v-if="getShowBreadCrumbIcon" class="el-icon-bicycle"></i> 活动管理
    </el-breadcrumb-item>
    <el-breadcrumb-item><i v-if="getShowBreadCrumbIcon" class="el-icon-s-home"></i> 活动详情</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useRootSetting } from '/@/hooks/setting/useRootSetting'
  export default defineComponent({
    name: 'BreadCrumb',
    setup() {
      const { getShowBreadCrumbIcon } = useRootSetting();
      return {
        getShowBreadCrumbIcon,
      };
    },
  });
</script>
