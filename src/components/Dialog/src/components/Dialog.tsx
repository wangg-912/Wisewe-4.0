import { ElDialog } from 'element-plus';
import { defineComponent, toRefs, unref } from 'vue';
import { basicProps } from '../props';
import { useDialogDragMove } from '../hooks/useDialogDrag';
import { useAttrs } from '/@/hooks/core/useAttrs';
import { extendSlots } from '/@/utils/helper/tsxHelper';

export default defineComponent({
  name: 'Dialog',
  inheritAttrs: false,
  props: basicProps,
  setup(props, { slots }) {
    const { visible, draggable, destroyOnClose } = toRefs(props);
    const attrs = useAttrs();
    useDialogDragMove({
      visible,
      destroyOnClose,
      draggable,
    })
    return () => {
      const propsData = { ...unref(attrs), ...props } as Recordable;
      return <ElDialog model-value={propsData.visible} {...propsData}  showClose={false}>
        {extendSlots(slots)}
      </ElDialog>;
    }
  }
})
