import { Fragment } from 'react';

import { Typography } from 'antd';

import { UsersList } from '#/client/entities/user';
import { Dialog } from '#/domain/dialog';
import { User } from '#/domain/user';

import { useSearchInChannels } from '../hooks';

export interface SearchInChannelsResultProps {
  query: string;
  onDialogClick(dialog: Dialog): void;
  onUserClick(user: User): void;
}

const style = {
  padding: '20px 20px',
};

export function SearchInChannelsResult({ query, onUserClick }: SearchInChannelsResultProps) {
  const searchQuery = useSearchInChannels({ query });

  return (
    <Fragment>
      {!!searchQuery.users.length && (
        <section style={style}>
          <Typography.Title level={4}>Users</Typography.Title>
          <UsersList users={searchQuery.users} onClick={onUserClick} />
        </section>
      )}
    </Fragment>
  );
}
