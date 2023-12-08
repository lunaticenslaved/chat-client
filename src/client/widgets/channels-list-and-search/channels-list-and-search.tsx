import { useState } from 'react';

import { SearchInChannelsInput, SearchInChannelsResult } from '@/features/search/in-channels';
import { Divider } from '@/shared/components/divider';

import classes from './channels-list-and-search.module.scss';

export const ChannelsListAndSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section className={classes.sidebar}>
      <SearchInChannelsInput search={searchQuery} onChange={setSearchQuery} />

      <Divider />

      {!searchQuery ? null : <SearchInChannelsResult query={searchQuery} />}
    </section>
  );
};
