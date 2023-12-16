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

const style = {
  padding: '20px 20px',
};

export function SearchResults({ users, onUserClick }: SearchResultsProps) {
  return (
    <Fragment>
      {!!users.length && (
        <section style={style}>
          <Typography.Title level={4}>Users</Typography.Title>
          <UsersList users={users} onClick={onUserClick} />
        </section>
      )}
    </Fragment>
  );
}
