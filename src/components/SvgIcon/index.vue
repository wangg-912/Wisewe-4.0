<template>
  <i class="svg-icon">
    <svg class="icon svgfont" aria-hidden="true" :style="{'font-size':`${size}px`}">
      <use :xlink:href="xlinkHref" />
    </svg>
  </i>
</template>

<script lang="ts">
  import '/@/assets/icons/index.js';
  import { defineComponent, computed } from 'vue';
  export default defineComponent({
    name: 'SvgIcon',
    props: {
      type: {
        type: String,
        default: '',
      },
      size: {
        type: Number,
        default: 16,
      },
    },
    setup(props) {
      const xlinkHref = computed(() => `#${props.type}`);
      return {
        xlinkHref,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .svg-icon {
    .icon {
      width: 1em;
      height: 1em;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
    }
  }
</style>
