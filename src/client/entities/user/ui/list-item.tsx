import { useCallback } from 'react';

import { List, Typography } from 'antd';

import { User } from '#/domain/user';
import { Avatar } from '#/client/shared/components/avatar';

export interface UserListItemProps {
  user: User;
  onClick?(user: User): void;
}

export function UserListItem({ user, onClick }: UserListItemProps) {
  const handleClick = useCallback(() => onClick?.(user), [onClick, user]);

  return (
    <List.Item onClick={onClick ? handleClick : undefined}>
      <List.Item.Meta
        avatar={<Avatar url={user.avatar?.link} name={user.login} />}
        title={<Typography.Title level={5}>{user.login}</Typography.Title>}
        description={<Typography.Paragraph>{user.email}</Typography.Paragraph>}
      />
    </List.Item>
  );
}
