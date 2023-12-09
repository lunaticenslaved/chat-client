import { Fragment, useCallback } from 'react';

import { Typography } from 'antd';

import { useDialog } from '#/client/entities/dialog';
import { UsersList } from '#/client/entities/user';
import { createNewDialog } from '#/domain/dialog';
import { User } from '#/domain/user';

import { useSearchInChannels } from '../hooks';

export interface SearchInChannelsResultProps {
  query: string;
}

const style = {
  padding: '20px 20px',
};

export function SearchInChannelsResult({ query }: SearchInChannelsResultProps) {
  const searchQuery = useSearchInChannels({ query });
  const dialog = useDialog();

  const onUserClick = useCallback(
    (user: User) => {
      dialog.set(createNewDialog(user));
    },
    [dialog],
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
