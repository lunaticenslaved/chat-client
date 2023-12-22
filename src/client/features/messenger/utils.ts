import { Connection, ConnectionType } from '#/domain/connection';
import { User } from '#/domain/user';
import { notReachable } from '#/shared/utils';

import { SelectedItem } from './types';

export function getUserFromSelectedItem(selectedItem: SelectedItem): User | undefined {
  if (selectedItem.type === 'user') {
    return selectedItem.user;
  } else if (selectedItem.type === 'connection') {
    const connection = selectedItem.connection;

    if (connection.type === ConnectionType.OneToOne) {
      return connection.oneToOneDialog.partner;
    } else if (connection.type) {
      throw new Error('Not implemented');
    } else {
      notReachable(connection);
    }
  } else {
    notReachable(selectedItem);
  }
}

type ConnectionMetadata = {
  type: ConnectionType;
  title: string;
  subtitle?: string;
};

export function getConnectionTitles(connection: Connection): ConnectionMetadata {
  if (connection.type === ConnectionType.OneToOne) {
    const { partner } = connection.oneToOneDialog;

    return {
      type: ConnectionType.OneToOne,
      title: partner.login,
      subtitle: partner.email,
    };
  } else if (connection.type === ConnectionType.Group) {
    throw new Error('Not implemented');
  } else {
    notReachable(connection);
  }
}
