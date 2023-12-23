import { ReactNode } from 'react';

import { getContactName, useContactForUser } from '#/client/entities/contact';
import { MessageListItemProps } from '#/client/entities/message';
import { UserAvatar } from '#/client/entities/user';
import { useViewer } from '#/client/entities/viewer';
import { Connection, ConnectionType } from '#/domain/connection';
import { Message } from '#/domain/message';
import { User } from '#/domain/user';
import { notReachable } from '#/shared/utils';

import { SelectedItem } from '../types';

interface SelectedItemAvatarProps {
  selectedItem: SelectedItem;
}

export function SelectedItemAvatar({ selectedItem }: SelectedItemAvatarProps) {
  if (selectedItem.type === 'user') {
    return <UserAvatar user={selectedItem.user} />;
  } else if (selectedItem.type === 'connection') {
    return <ConnectionAvatar connection={selectedItem.connection} />;
  } else {
    notReachable(selectedItem);
  }
}

export function SelectedItemTitle({ selectedItem }: SelectedItemAvatarProps) {
  if (selectedItem.type === 'user') {
    return selectedItem.user.login;
  } else if (selectedItem.type === 'connection') {
    return <ConnectionTitle connection={selectedItem.connection} />;
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
    return <UserOrContactAvatar user={partner} />;
  } else if (connection.type === ConnectionType.Group) {
    throw new Error('Not implemented');
  } else {
    notReachable(connection);
  }
}

export function ConnectionTitle({ connection }: ConnectionAvatarProps) {
  const { getContactForUser } = useContactForUser();

  if (connection.type === ConnectionType.OneToOne) {
    const { partner } = connection.oneToOneDialog;
    const contact = getContactForUser(partner.id);

    return contact ? getContactName(contact) : partner.login;
  } else if (connection.type === ConnectionType.Group) {
    throw new Error('Not implemented');
  } else {
    notReachable(connection);
  }
}

export function ConnectionSubtitle({ connection }: ConnectionAvatarProps) {
  if (connection.type === ConnectionType.OneToOne) {
    const { partner } = connection.oneToOneDialog;
    return partner.email;
  } else if (connection.type === ConnectionType.Group) {
    throw new Error('Not implemented');
  } else {
    notReachable(connection);
  }
}

interface UserOrContactProps {
  user: User;
  size?: string;
  withoutOnlineStatus?: boolean;
}

function UserOrContactAvatar({ user, size, withoutOnlineStatus }: UserOrContactProps) {
  const { getContactForUser } = useContactForUser();
  const contact = getContactForUser(user.id);
  return (
    <UserAvatar
      user={user}
      contact={contact}
      size={size}
      withoutOnlineStatus={withoutOnlineStatus}
    />
  );
}

interface MessageItemInfoProps {
  message: Message;
  children(props: {
    ownerName: string;
    avatar: MessageListItemProps['avatar'];
    isReadByMe: boolean;
    isMyMessageRead: boolean;
    isMe: boolean;
  }): ReactNode;
}

export function MessageItemInfo({ children, message }: MessageItemInfoProps) {
  const { getContactForUser } = useContactForUser();
  const { user: viewer } = useViewer();
  const contact = getContactForUser(message.authorId);
  const isMe = message.authorId === viewer?.id;

  return children({
    isMe,
    isMyMessageRead: !!message.isReadByUsers.find(user => user.id !== viewer?.id),
    isReadByMe: !!message.isReadByUsers.find(user => user.id === viewer?.id),
    ownerName: contact ? getContactName(contact) : message.author.login,
    avatar: ({ size }) => (
      <UserOrContactAvatar user={message.author} size={size} withoutOnlineStatus={true} />
    ),
  });
}
