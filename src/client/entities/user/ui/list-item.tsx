import { useCallback } from 'react';

import { Typography } from 'antd';

import { Avatar } from '#/client/shared/components/avatar';
import { ListItem } from '#/client/shared/list-item';
import { User } from '#/domain/user';

export interface UserListItemProps {
  user: User;
  onClick?(user: User): void;
}

export function UserListItem({ user, onClick }: UserListItemProps) {
  const handleClick = useCallback(() => onClick?.(user), [onClick, user]);

  return (
    <ListItem
      onClick={onClick ? handleClick : undefined}
      isActive={false}
      avatar={<Avatar url={user.avatar?.link} name={user.login} />}
      title={<Typography.Text style={{ fontWeight: 'bold' }}>{user.login}</Typography.Text>}
      description={<Typography.Text>{user.email}</Typography.Text>}
    />
  );
}
