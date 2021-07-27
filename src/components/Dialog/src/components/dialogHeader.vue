<template>
  <BasicTitle>
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
    },
  });
</script>
