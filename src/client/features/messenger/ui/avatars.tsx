import { UserAvatar } from '#/client/entities/user';
import { SelectedItem } from '#/client/features/messenger/types';
import {
  getAvatarLinkFromSelectedItem,
  getTitleFromSelectedItem,
} from '#/client/features/messenger/utils';
import { Avatar } from '#/client/shared/components/avatar';
import { Connection, ConnectionType } from '#/domain/connection';
import { notReachable } from '#/shared/utils';

interface SelectedItemAvatarProps {
  selectedItem: SelectedItem;
}

export function SelectedItemAvatar({ selectedItem }: SelectedItemAvatarProps) {
  if (selectedItem.type === 'user') {
    return <UserAvatar user={selectedItem.user} />;
  } else if (selectedItem.type === 'connection') {
    const title = getTitleFromSelectedItem(selectedItem);
    const avatarLink = getAvatarLinkFromSelectedItem(selectedItem);

    return <Avatar src={avatarLink} name={title} />;
  } else {
    notReachable(selectedItem);
  }
}

interface ConnectionAvatarProps {
  connection: Connection;
}

export function ConnectionAvatar({ connection }: ConnectionAvatarProps) {
  if (connection.type === ConnectionType.OneToOne) {
    const { partner } = connection.oneToOneDialog;
    return <UserAvatar user={partner} />;
  } else if (connection.type === ConnectionType.Group) {
    throw new Error('Not implemented');
  } else {
    notReachable(connection);
  }
}
