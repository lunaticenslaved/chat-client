import { Avatar } from '#/client/shared/components/avatar';
import { Contact } from '#/domain/contact';
import { User } from '#/domain/user';

import { useUserOnlineStatus } from '../hooks/online-status';

interface UserAvatarProps {
  user: User;
  contact?: Contact;
  size?: string;
  withoutOnlineStatus?: boolean;
}

export function UserAvatar({ user, contact, size, withoutOnlineStatus }: UserAvatarProps) {
  const { getOnlineStatus } = useUserOnlineStatus();

  return (
    <Avatar
      src={user.avatar?.link}
      name={contact?.name || user.login}
      isOnline={withoutOnlineStatus ? false : getOnlineStatus(user.id)}
      style={{ height: size, width: size }}
    />
  );
}
