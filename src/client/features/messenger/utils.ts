import { SelectedItem } from '#/client/features/messenger/types';
import { Connection, ConnectionType } from '#/domain/connection';
import { User } from '#/domain/user';
import { notReachable } from '#/shared/utils';

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

export function getAvatarLinkFromSelectedItem(selectedItem: SelectedItem): string | undefined {
  if (selectedItem.type === 'user') {
    return selectedItem.user.avatar?.link;
  } else if (selectedItem.type === 'connection') {
    const connection = selectedItem.connection;

    if (connection.type === ConnectionType.OneToOne) {
      return connection.oneToOneDialog.partner.avatar?.link;
    } else if (connection.type) {
      throw new Error('Not implemented');
    } else {
      notReachable(connection);
    }
  } else {
    notReachable(selectedItem);
  }
}

export function getTitleFromSelectedItem(selectedItem: SelectedItem): string {
  if (selectedItem.type === 'user') {
    return selectedItem.user.login;
  } else if (selectedItem.type === 'connection') {
    const connection = selectedItem.connection;

    if (connection.type === ConnectionType.OneToOne) {
      return connection.oneToOneDialog.partner.login;
    } else if (connection.type === ConnectionType.Group) {
      return 'Not implemented';
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
