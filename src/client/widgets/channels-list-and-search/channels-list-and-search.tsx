import { useState } from 'react';

import { DialogsList } from '#/client/entities/dialog';
import { useConnections, useSearch } from '#/client/features/messenger';
import {
  SearchInChannelsInput,
  SearchInChannelsResult,
} from '#/client/features/search/in-channels';
import { Divider } from '#/client/shared/components/divider';

import classes from './channels-list-and-search.module.scss';

export const ChannelsListAndSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { setSelectedUser } = useSearch();
  const { connections, setCurrentConnection } = useConnections();

  return (
    <section className={classes.sidebar}>
      <SearchInChannelsInput search={searchQuery} onChange={setSearchQuery} />

      <Divider />

      <div style={{ overflowY: 'auto' }}>
        {!searchQuery ? (
          <DialogsList dialogs={connections} onClick={setCurrentConnection} />
        ) : (
          <SearchInChannelsResult
            query={searchQuery}
            onDialogClick={setCurrentConnection}
            onUserClick={setSelectedUser}
          />
        )}
      </div>
    </section>
  );
};
