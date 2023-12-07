import { User } from '@common/models';
import { List } from 'antd';

import { UserListItem } from './list-item';

export interface UsersListProps {
  users: User[];
}

export function UsersList({ users }: UsersListProps) {
  return (
    <List
      dataSource={users}
      renderItem={user => {
        return <UserListItem key={user.id} user={user} />;
      }}
    />
  );
}
