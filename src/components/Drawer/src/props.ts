import type { PropType } from 'vue';
import { propTypes } from '/@/utils/propTypes';
export const basicProps = {
  title: propTypes.string.def(''),
  visible: propTypes.bool,
  modal: propTypes.bool.def(true),
  showClose: propTypes.bool.def(true),
  destroyOnClose: propTypes.bool.def(true),
  closeOnPressEscape: propTypes.bool.def(true),
  direction: propTypes.string.def('rtl'),
  size: {
    type: [Number, String] as PropType<any>,
    default: '340px',
  },
  closeFunc: {
    type: [Function, Object] as PropType<any>,
    default: null,
  },
  handleClose: {
    type: [Function, Object] as PropType<any>,
    default: null,
  },
};
