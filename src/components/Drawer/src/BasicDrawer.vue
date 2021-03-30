<template>
  <el-drawer :class="prefixCls" v-model="drawer" direction="rtl" destroy-on-close size="340px;">
    <template #title v-if="!$slots.title">
      <div>1234</div>
    </template>
    <el-scrollbar wrap-class='scrollbar-wrapper'>
      <slot></slot>
    </el-scrollbar>
  </el-drawer>
</template>
<script lang="ts">
  import { defineComponent,ref } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useAttrs } from '/@/hooks/core/useAttrs';
  export default defineComponent({
    name: 'BasicDrawer',
    inheritAttrs: false,
    emits: ['register'],
    setup(props, { emit }) {
     /*  const visibleRef = ref(false);
      const attrs = useAttrs();
      const propsRef = ref<Partial<Nullable<DrawerProps>>>(null); */
      const { prefixCls } = useDesign('basic-drawer');
      return {
        prefixCls,
      };
    }
  })
</script>
