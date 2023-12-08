import { User } from '@domain/user';
import { List } from 'antd';

import { UserListItem } from './list-item';

export interface UsersListProps {
  users: User[];
  onClick?(user: User): void;
}

export function UsersList({ users, onClick }: UsersListProps) {
  return (
    <List
      dataSource={users}
      renderItem={user => {
        return <UserListItem key={user.id} user={user} onClick={onClick} />;
      }}
    />
  );
}
