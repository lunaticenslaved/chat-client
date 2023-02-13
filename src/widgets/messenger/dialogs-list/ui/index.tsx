import React from "react";

import dayjs from "shared/lib/dayjs";

import { DialogItem, DialogItemProps } from "./item";

interface DialogsListProps {
  dialogs: DialogItemProps[];
  className?: string;
}

export type { DialogItemProps };

export const DialogsList = (props: DialogsListProps) => {
  const localDialogs = React.useMemo(() => {
    const lds = [...props.dialogs];
    lds.sort((a, b) => {
      const at = dayjs(a.message.time);
      const bt = dayjs(b.message.time);
      if (at.isAfter(bt)) return -1;
      if (at.isBefore(bt)) return 1;
      return 0;
    });
    return lds;
  }, [props.dialogs]);

  return (
    <div className={props.className}>
      {localDialogs.map((a, idx) => (
        <DialogItem key={idx} {...a} />
      ))}
    </div>
  );
};
