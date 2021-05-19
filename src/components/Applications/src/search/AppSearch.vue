<template>
  <div :class="`${prefixCls}`" v-if="getShowSearch">
    <el-tooltip class="item" effect="dark" content="搜索菜单" placement="bottom">
      <i class="el-icon-search" size="18" @click="handleSearch"></i>
    </el-tooltip>
    <AppSearchModal @close="handleClose" :visible="showModal" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
  import AppSearchModal from './AppSearchModal.vue';
  export default defineComponent({
    components: { AppSearchModal },
    setup(){
      const showModal = ref(false);
      const prefixCls = useDesign('app-search');
      const { getShowSearch } = useHeaderSetting();
      function handleSearch() {
        showModal.value = true;
      }

      function handleClose() {
        showModal.value = false;
      }
      return{
        prefixCls,
        getShowSearch,
        showModal,
        handleSearch,
        handleClose,
      }
    }
  })
</script>