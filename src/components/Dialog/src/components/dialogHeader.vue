<template>
  <BasicTitle>
    <i
      v-if="icon"
      :class="icon"
      size="18"
      style="display: flex; justify-content: center; align-items: center; padding-right: 4px;"
    ></i>
    {{ title }}
  </BasicTitle>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { propTypes } from '/@/utils/propTypes';

  import { BasicTitle } from '/@/components/Basic';
  export default defineComponent({
    name: 'DialogHeader',
    components: {
      BasicTitle,
    },
    props: {
      title: propTypes.string,
      icon: propTypes.string,
    },
  });
</script>
