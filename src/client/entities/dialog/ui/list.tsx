import { List } from 'antd';

import { Connection } from '#/domain/connection';

import { DialogListItem } from './list-item';

export type DialogsListProps = {
  dialogs: Connection[];
  currentConnectionId?: string;
  onClick?(dialog: Connection): void;
};

export function DialogsList({ dialogs, currentConnectionId, onClick }: DialogsListProps) {
  return (
    <List>
      {dialogs.map(dialog => {
        return (
          <DialogListItem
            key={dialog.id}
            dialog={dialog}
            onClick={onClick}
            isActive={dialog.id === currentConnectionId}
          />
        );
      })}
    </List>
  );
}
