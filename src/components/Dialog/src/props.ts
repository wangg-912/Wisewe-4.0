import type { PropType, CSSProperties } from 'vue';
import { propTypes, VueNode } from '/@/utils/propTypes';

import type { IDWrapperProps, ButtonProps } from './types';

export const modalProps = {
  visible: propTypes.bool,
  height: propTypes.number,
  // open drag
  draggable: propTypes.bool.def(true),
  center: propTypes.bool,
  cancelText: propTypes.string.def('取消'),
  okText: propTypes.string.def('确定'),

  close: Function as PropType<() => Promise<boolean>>,
};

export const basicProps = Object.assign({}, modalProps, {
  fullscreen: propTypes.bool.def('false'),
  // 开启全屏
  canFullscreen: propTypes.bool.def(true),
  // After enabling the wrapper, the bottom can be increased in height
  wrapperFooterOffset: propTypes.number.def(0),
  // Whether to setting wrapper
  useWrapper: propTypes.bool.def(true),
  loading: propTypes.bool,
  loadingTip: propTypes.string.def('加载中...'),
  // 显示取消按钮
  showCancelBtn: propTypes.bool.def(true),
  //显示保存按钮
  showOkBtn: propTypes.bool.def(true),
  wrapperProps: Object as PropType<Partial<IDWrapperProps>>,
  beforeClose: Function as PropType<() => Promise<VueNode>>,
  bodyStyle: Object as PropType<CSSProperties>,
  showClose: propTypes.bool.def(true),
  closeIcon: Object as PropType<VueNode>,
  destroyOnClose: propTypes.bool,
  footer: Object as PropType<VueNode>,
  getContainer: Function as PropType<() => any>,
  modal: propTypes.bool.def(true),
  closeOnClickModal: propTypes.bool.def(false),
  keyboard: propTypes.bool.def(true),
  okType: propTypes.string.def('primary'),
  okButtonProps: Object as PropType<ButtonProps>,
  cancelButtonProps: Object as PropType<ButtonProps>,
  title: propTypes.string.def('标题'),
  visible: propTypes.bool,
  width: {
    type: [String, Number] as PropType<string | number>,
    default: 640,
  },
  height: propTypes.number.def(400),
  customClass: propTypes.string,
  closeOnPressEscape: propTypes.bool.def(false),
});
