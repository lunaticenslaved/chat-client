import { List } from 'antd';

import { Dialog } from '#/domain/dialog';

import { DialogListItem } from './list-item';

export type DialogsListProps = {
  dialogs: Dialog[];
  onClick?(dialog: Dialog): void;
};

export function DialogsList({ dialogs, onClick }: DialogsListProps) {
  return (
    <List>
      {dialogs.map(dialog => {
        return <DialogListItem key={dialog.id} dialog={dialog} onClick={onClick} />;
      })}
    </List>
  );
}
