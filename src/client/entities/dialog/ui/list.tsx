import { List } from 'antd';

import { Connection } from '#/domain/connection';

import { DialogListItem } from './list-item';

export type DialogsListProps = {
  dialogs: Connection[];
  onClick?(dialog: Connection): void;
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
