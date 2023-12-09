import { useState } from 'react';

import { DialogsList, useDialogsContext } from '#/client/entities/dialog';
import {
  SearchInChannelsInput,
  SearchInChannelsResult,
} from '#/client/features/search/in-channels';
import { Divider } from '#/client/shared/components/divider';

import classes from './channels-list-and-search.module.scss';

export const ChannelsListAndSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { setCurrentDialog, dialogs } = useDialogsContext();

  return (
    <section className={classes.sidebar}>
      <SearchInChannelsInput search={searchQuery} onChange={setSearchQuery} />

      <Divider />

      {!searchQuery ? (
        <DialogsList dialogs={dialogs} onClick={setCurrentDialog} />
      ) : (
        <SearchInChannelsResult query={searchQuery} onClick={setCurrentDialog} />
      )}
    </section>
  );
};
