import type { PropType, CSSProperties } from 'vue';
import { propTypes, VueNode } from '/@/utils/propTypes';
import { IDWrapperProps, ButtonSize, ButtonTypes, ButtonShapes } from './types';
import { object } from 'vue-types';
/**
 * @description 模态窗默认配置
 */
export const dialogProps = {
  visible: propTypes.bool,
  width: propTypes.number.def(640),
  height: propTypes.number.def(400),
  draggable: propTypes.bool.def(true),
  cancelText: propTypes.string.def('取消'),
  okText: propTypes.string.def('确定'),
  okType: propTypes.string.def('primary'),
  showClose: propTypes.bool.def(true),
  modal: propTypes.bool.def(true),
  /* 按钮级别扩展配置*/
  size: propTypes.oneOf(ButtonSize).def('mini'),
  type: propTypes.oneOf(ButtonTypes).def('info'),
  shape: propTypes.oneOf(ButtonShapes).def('plain'),
  disabled: propTypes.bool.def(false),
  icon: propTypes.string,
  autofocus: propTypes.bool.def(false),
  'native-type': propTypes.oneOf(['button', 'submit', 'reset']).def('button'),
  /* }, */
};
/**
 * @description {All} 模态窗全配置
 */
export const basicProps = Object.assign({}, dialogProps, {
  title: propTypes.string.def('标题'),
  titleIcon: propTypes.bool,
  fullscreen: propTypes.bool.def('false'),
  canFullscreen: propTypes.bool.def(true),
  wrapperFooterOffset: propTypes.number.def(0),
  /* 插槽必须开启次配置，计算属性使用的 */
  useWrapper: propTypes.bool.def(true),
  loading: propTypes.bool,
  showCancelBtn: propTypes.bool.def(true),
  showOkBtn: propTypes.bool.def(true),
  wrapperProps: Object as PropType<Partial<IDWrapperProps>>,
  bodyStyle: Object as PropType<CSSProperties>,
  closeIcon: Object as PropType<VueNode>,
  destroyOnClose: propTypes.bool.def(true),
  footer: Object as PropType<VueNode>,
  open: Function as PropType<() => any>,
  close: Function as PropType<() => any>,
  save: Function as PropType<() => any>,
  beforeClose: Function as PropType<() => Promise<VueNode>>,
  closeOnClickModal: propTypes.bool.def(false),
  visible: propTypes.bool,
  customClass: propTypes.string,
  renderFrame: propTypes.bool.def(false),
  indata: {
    type: Object as PropType<object | string>,
    default: null,
  },
  closeOnPressEscape: propTypes.bool.def(false),
});
