import { User } from '@common/models';

export interface UsersListProps {
  users: User[];
}

export function UsersList({ users }: UsersListProps) {
  return (
    <ul>
      {users.map(user => {
        console.log(user);
        return <li key={user.id}>{user.login}</li>;
      })}
    </ul>
  );
}
