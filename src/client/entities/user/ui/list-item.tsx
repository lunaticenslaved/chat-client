import { User } from '@common/models';
import { List, Typography } from 'antd';

import { Avatar } from '@/shared/components/avatar';

export interface UserListItemProps {
  user: User;
}

export function UserListItem({ user }: UserListItemProps) {
  return (
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar url={user.avatar?.link} name={user.login} />}
        title={<Typography.Title level={5}>{user.login}</Typography.Title>}
        description={<Typography.Paragraph>{user.email}</Typography.Paragraph>}
      />
    </List.Item>
  );
}
