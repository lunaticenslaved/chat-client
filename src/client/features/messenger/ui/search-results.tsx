import { Fragment } from 'react';

import { Typography } from 'antd';

import { UsersList } from '#/client/entities/user';
import { Connection } from '#/domain/connection';
import { User } from '#/domain/user';

export interface SearchResultsProps {
  connections: Connection[];
  users: User[];
  onConnectionClick(dialog: Connection): void;
  onUserClick(user: User): void;
}

export function SearchResults({ users, onUserClick }: SearchResultsProps) {
  return (
    <Fragment>
      {!!users.length && (
        <section>
          <Typography.Title level={4}>Users</Typography.Title>
          <UsersList users={users} onClick={onUserClick} />
        </section>
      )}
    </Fragment>
  );
}
