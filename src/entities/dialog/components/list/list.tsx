import { Empty, Spin } from "antd";

import { DialogModel } from "@/entities/dialog";

import { Dialog } from "../dialog/dialog";

import classes from "./list.module.scss";

export type DialogsListProps = {
  dialogs: DialogModel[];
  currentDialogId?: number;
  isLoading: boolean;
  isError: boolean;
  onSelectDialog: (dialog: DialogModel) => void;
};

export const DialogsList = ({
  dialogs,
  currentDialogId,
  isLoading,
  isError,
  onSelectDialog,
}: DialogsListProps) => {
  if (isLoading) {
    return (
      <div className={classes.emptyWrapper}>
        <Spin tip="Загрузка диалогов " size="large" />
      </div>
    );
  } else if (dialogs.length > 0) {
    return (
      <div className={classes.dialogsList}>
        {dialogs.map((dialog, idx) => (
          <Dialog
            dialog={dialog}
            key={idx}
            onSelect={onSelectDialog}
            isSelected={dialog.id === currentDialogId}
          />
        ))}
      </div>
    );
  } else if (isError) {
    return (
      <div className={classes.emptyWrapper}>
        <Empty description="Что-то пошло не так" />
      </div>
    );
  }

  return (
    <div className={classes.emptyWrapper}>
      <Empty description="Нет диалогов" />
    </div>
  );
};
