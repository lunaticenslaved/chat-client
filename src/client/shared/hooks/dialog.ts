import { useMemo } from 'react';

import { useToggle } from './toggle';

export type UseDialogProps = {
  value?: boolean;
};

export interface IUseDialog {
  isOpen: boolean;
  open(): void;
  close(): void;
}

export function useDialog(props: UseDialogProps = {}): IUseDialog {
  const toggle = useToggle(props);

  return useMemo(
    () => ({
      isOpen: toggle.isTrue,
      open: toggle.setTrue,
      close: toggle.setFalse,
    }),
    [toggle.isTrue, toggle.setFalse, toggle.setTrue],
  );
}
