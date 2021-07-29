import { InjectionKey } from 'vue';
import { createContext, useContext } from '/@/hooks/core/useContext';

export interface ModalContextProps {
  redoModalHeight: () => void;
}

const key: InjectionKey<ModalContextProps> = Symbol();

export function createDialogContext(context: ModalContextProps) {
  return createContext<ModalContextProps>(context, key);
}

export function useDialogContext() {
  return useContext<ModalContextProps>(key);
}
