import { useState } from 'react';

import { DialogsList, useDialog } from '#/client/entities/dialog';
import {
  SearchInChannelsInput,
  SearchInChannelsResult,
} from '#/client/features/search/in-channels';
import { Divider } from '#/client/shared/components/divider';
import { store, useAppSelector } from '#/store';

import classes from './channels-list-and-search.module.scss';

export const ChannelsListAndSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dialogs = useAppSelector(store.dialogs.selectors.selectDialogs);
  const dialog = useDialog();

  return (
    <section className={classes.sidebar}>
      <SearchInChannelsInput search={searchQuery} onChange={setSearchQuery} />

      <Divider />

      {!searchQuery ? (
        <DialogsList dialogs={dialogs} onClick={dialog.set} />
      ) : (
        <SearchInChannelsResult query={searchQuery} onClick={dialog.set} />
      )}
    </section>
  );
};
