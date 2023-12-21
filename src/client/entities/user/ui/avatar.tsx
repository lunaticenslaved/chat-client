import { Avatar } from '#/client/shared/components/avatar';
import { User } from '#/domain/user';

import { useUserOnlineStatus } from '../hooks/online-status';

interface UserAvatarProps {
  user: User;
}

export function UserAvatar({ user }: UserAvatarProps) {
  const { getOnlineStatus } = useUserOnlineStatus();

  return <Avatar src={user.avatar?.link} name={user.login} isOnline={getOnlineStatus(user.id)} />;
}
