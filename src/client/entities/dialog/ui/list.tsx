import { List } from 'antd';

import { Dialog, getDialogIdentifier } from '#/domain/dialog';

import { DialogListItem } from './list-item';

export type DialogsListProps = {
  dialogs: Dialog[];
  onClick?(dialog: Dialog): void;
};

export function DialogsList({ dialogs, onClick }: DialogsListProps) {
  return (
    <List>
      {dialogs.map(dialog => {
        return (
          <DialogListItem key={getDialogIdentifier(dialog)} dialog={dialog} onClick={onClick} />
        );
      })}
    </List>
  );
}
