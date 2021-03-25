<template>
  <div style="width: 100%; height: 100%;">
    <FrameView />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import FrameView from './iframeView.vue'
  export default defineComponent({
    name: 'FramePanel',
    components:{ FrameView },
    setup(){
      return {}
    }
    
  })
</script>
<style lang="scss" scoped>

</style>
