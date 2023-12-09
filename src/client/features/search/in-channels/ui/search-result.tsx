import { Fragment, useCallback } from 'react';

import { Typography } from 'antd';

import { UsersList } from '#/client/entities/user';
import { Dialog, createNewDialog } from '#/domain/dialog';
import { User } from '#/domain/user';

import { useSearchInChannels } from '../hooks';

export interface SearchInChannelsResultProps {
  query: string;
  onClick?(dialog: Dialog): void;
}

const style = {
  padding: '20px 20px',
};

export function SearchInChannelsResult({ query, onClick }: SearchInChannelsResultProps) {
  const searchQuery = useSearchInChannels({ query });

  const onUserClick = useCallback(
    (user: User) => {
      onClick?.(createNewDialog(user));
    },
    [onClick],
  );

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
