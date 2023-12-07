import { Fragment } from 'react';

import { Typography } from 'antd';

import { DialogsList } from '@/entities/dialog';
import { UsersList } from '@/entities/user';

import { useSearchInChannels } from '../hooks';

export interface SearchInChannelsResultProps {
  query: string;
}

const style = {
  padding: '20px 20px',
};

export function SearchInChannelsResult({ query }: SearchInChannelsResultProps) {
  const searchQuery = useSearchInChannels({ query });

  return (
    <Fragment>
      {!!searchQuery.dialogs.length && (
        <section style={style}>
          <Typography.Title level={4}>Dialogs</Typography.Title>
          <DialogsList
            dialogsQuery={searchQuery}
            currentDialogId={undefined}
            onSelectDialog={() => {}}
          />
        </section>
      )}

      {!!searchQuery.users.length && (
        <section style={style}>
          <Typography.Title level={4}>Users</Typography.Title>
          <UsersList users={searchQuery.users} />
        </section>
      )}
    </Fragment>
  );
}
