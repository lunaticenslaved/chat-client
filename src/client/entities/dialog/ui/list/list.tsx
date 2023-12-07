import { Dialog as DialogModel } from '@common/models';
import { Empty, Spin } from 'antd';

import { UseDialogsResponse, useDialogs } from '@/entities/dialog';

import { Dialog } from '../dialog/dialog';

import classes from './list.module.scss';

export type DialogsListProps = {
  dialogsQuery?: UseDialogsResponse;
  currentDialogId?: number;
  onSelectDialog: (dialog: DialogModel) => void;
};

export const DialogsList = ({
  onSelectDialog,
  currentDialogId,
  dialogsQuery: dialogsQueryProp,
}: DialogsListProps) => {
  const dialogsQueryLocal = useDialogs({ disabled: !!dialogsQueryProp });
  const dialogsQuery = dialogsQueryProp || dialogsQueryLocal;

  console.log('dialogsQueryProp', dialogsQueryProp);

  const { isError, isLoading, dialogs } = dialogsQuery;

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
