import { tuple } from '/@/type/utils';
import type { ExtractPropTypes } from 'vue';
import type { CSSProperties, VNodeChild, ComputedRef } from 'vue';
/**
 * @description 按钮类型约束
 */
const buttonProps = () => ({
  size: String,
  type: String,
  shape: String,
  loading: Boolean,
  disabled: Boolean,
  icon: String,
  autofocus: Boolean,
  'native-type': String,
});
/**
 * @description 按钮可选类型
 */
export const ButtonTypes = tuple('primary', 'success', 'warning', 'danger', 'info', 'text');
/**
 * @description 按钮可选形状
 */
export const ButtonShapes = tuple('plain', 'circle', 'round');
/**
 * @description 按钮可选大小
 */
export const ButtonSize = tuple('medium ', 'small', 'mini');
/**
 * @description 按钮全类型约束
 */
export type ButtonProps = Partial<ExtractPropTypes<ReturnType<typeof buttonProps>>>;
/* TODO 旧框架配置 */
/* export interface IDialog {
  dialogId: number;
  iframeId: number | string;
  title: string;
  indata: string | object;
  width: number;
  height: number;
  iconCls: string;
  buttons: Array<unknown>;
  minimizable: boolean;
  maximizable: boolean;
  showClose: boolean;
  validator: Array<unknown>;
  callback: Array<any>;
} */
/**
 * @description 模态窗接口全配置
 */
export interface DialogProps {
  /* 模态窗的标题 */
  title?: VNodeChild | JSX.Element;
  /* 模态窗的默认宽度; */
  width?: string | number;
  /* 模态窗的默高度; */
  height?: number;
  fullscreen: boolean;
  /* 是否可以进行全屏 */
  canFullscreen: boolean;
  /* 启用wrapper后 底部可以适当增加高度 */
  wrapperFooterOffset?: number;
  /* 拖拽 */
  draggable?: boolean;
  /* 是否展示 */
  visible?: boolean;
  /* 是否使用modalWrapper */
  useWrapper: boolean;
  /* 加载及加载文案 */
  loading: boolean;
  loadingTip?: string;
  wrapperProps: Omit<IDWrapperProps, 'loading'>;
  /* 按钮 */
  showOkBtn: boolean;
  showCancelBtn: boolean;
  /* 打开事件 */
  open: () => Promise<any>;
  /* 关闭事件 */
  close: () => Promise<any>;
  save: () => Promise<any>;
  /* 模态窗关闭之前的调用; */
  beforeClose?: () => any;
  /* 模态窗整体父容器样式; */
  bodyStyle?: CSSProperties;
  /**
   * 取消按钮的文本
   * @default '取消'
   * @type string
   */
  cancelText?: string;
  /**
   * 居中
   * @default false
   * @type boolean
   */
  center?: boolean;
  /* 显示模态窗的关闭按钮 */
  showClose?: boolean;
  /* 模态窗关闭按钮的自定义icon */
  closeIcon?: VNodeChild | JSX.Element;
  /* 关闭时销毁 Dialog 中的元素 */
  destroyOnClose?: boolean;
  /**
   * 底部容器, 设置 :footer="null" 不显示任何按钮组
   * @default 确认和取消2组按钮
   * @type any (string | slot)
   */
  footer?: VNodeChild | JSX.Element;

  /* 是否需要遮罩层; */
  modal?: boolean;
  /* 是否可以通过点击 modal 关闭 Dialog */
  closeOnClickModal?: boolean;
  /* 保存按钮的文本; */
  okText?: string;
  /* 确定按钮可选的类型 */
  okType?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text';

  /* Dialog 的自定义类名 */
  customClass?: string;
  /* 是否可以通过按下 ESC 关闭 Dialog */
  closeOnPressEscape: boolean;
  buttonOptions?: object;
}

/**
 * @description: 模态窗对外暴露的方法
 */
export interface DialogMethods {
  setModalProps: (props: Partial<DialogProps>) => void;
  emitVisible?: (visible: boolean, uid: number) => void;
  redoModalHeight?: () => void;
}
/**
 * @description 注册机制类型
 */
export type RegisterFn = (modalMethods: DialogMethods, uuid?: string) => void;
/**
 * @description 封装模态窗的函数接口
 */
export interface ReturnMethods extends DialogMethods {
  openDialog: <T = any>(props?: boolean, data?: T, openOnSet?: boolean) => void;
  getVisible?: ComputedRef<boolean>;
}
/**
 * @description 使用模态窗返回类型
 */
export type UseDialogReturnType = [RegisterFn, ReturnMethods];
/**
 * @description 使用模态窗内部触发方法
 */
export interface ReturnInnerMethods extends DialogMethods {
  closeModal: () => void;
  changeLoading: (loading: boolean) => void;
  changeOkLoading: (loading: boolean) => void;
  getVisible?: ComputedRef<boolean>;
}

export type UseModalInnerReturnType = [RegisterFn, ReturnInnerMethods];

/**
 * @description 模态窗容器配置
 */
export interface IDWrapperProps {
  footerOffset?: number;
  loading: boolean;
  dialogHeaderHeight: number;
  dialogFooterHeight: number;
  minHeight: number;
  height: number;
  visible: boolean;
  fullscreen: boolean;
  renderFrame: boolean;
  useWrapper: boolean;
}
