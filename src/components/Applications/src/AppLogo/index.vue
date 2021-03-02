<template>
  <div>
    <el-image style="width: 32px; height: 32px" :src="url" :fit="fit" />
    <div>{{ title }}</div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'AppLogo',
    data() {
      return {
        title:'ABC',
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        fit: 'contain',
      };
    },
  });
</script>
