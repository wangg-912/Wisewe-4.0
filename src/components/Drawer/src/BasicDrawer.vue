<template>
  <el-drawer :class="prefixCls" @close="onClose">
    <template #title v-if="!$slots.title">
      <div>1234</div>
    </template>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <slot></slot>
    </el-scrollbar>
  </el-drawer>
</template>
<script lang="ts">
  import { defineComponent, computed, ref, unref, toRaw, nextTick, getCurrentInstance } from 'vue';
  import { isFunction, isNumber, deepMerge } from '/@/utils/tools';
  import type { DrawerInstance, DrawerProps } from './type';
  import { basicProps } from './props';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useAttrs } from '/@/hooks/core/useAttrs';
  export default defineComponent({
    name: 'BasicDrawer',
    inheritAttrs: false,
    props: basicProps,
    emits: ['register'],
    setup(props, { emit }) {
      const visibleRef = ref(false);
      const attrs = useAttrs();
      const propsRef = ref<Partial<Nullable<DrawerProps>>>(null);
      const { prefixCls } = useDesign('basic-drawer');
      const drawerInstance: DrawerInstance = {
        setDrawerProps: setDrawerProps,
        emitVisible: undefined,
      };

      const instance = getCurrentInstance();
      instance && emit('register', drawerInstance, instance.uid);

      const getMergeProps = computed(
        (): DrawerProps => {
          return deepMerge(toRaw(props), unref(propsRef));
        }
      );
      const getProps = computed(
        (): DrawerProps => {
          const opt = {
            direction: 'rtl',
            ...unref(attrs),
            ...unref(getMergeProps),
            visible: unref(visibleRef),
          };
          opt.title = undefined;
          return opt as DrawerProps;
        }
      );
      const getBindValues = computed(
        (): DrawerProps => {
          return {
            ...attrs,
            ...unref(getProps),
          };
        }
      );

      watchEffect(() => {
        visibleRef.value = props.visible;
      });

      watch(
        () => visibleRef.value,
        (visible) => {
          nextTick(() => {
            emit('visible-change', visible);
            instance && drawerInstance.emitVisible?.(visible, instance.uid);
          });
        }
      );

      async function onClose(e: Recordable) {
        const { closeFunc } = unref(getProps);
        emit('close', e);
        if (closeFunc && isFunction(closeFunc)) {
          const res = await closeFunc();
          visibleRef.value = !res;
          return;
        }
        visibleRef.value = false;
      }

      function setDrawerProps(props: Partial<DrawerProps>): void {
        // Keep the last setDrawerProps
        propsRef.value = deepMerge(unref(propsRef) || {}, props);

        if (Reflect.has(props, 'visible')) {
          visibleRef.value = !!props.visible;
        }
      }
      return {
        prefixCls,
        onClose,
        getMergeProps,
        getProps,
        getBindValues,
      };
    },
  });
</script>
