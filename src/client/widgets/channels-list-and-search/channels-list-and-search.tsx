import { useState } from 'react';

import { EditOutlined, UserOutlined } from '@ant-design/icons';

import { DialogsList } from '@/entities/dialog';
import { SearchInChannelsInput, SearchInChannelsResult } from '@/features/search/in-channels';
import { Divider } from '@/shared/components/divider';

import { useCurrentDialog } from '../../entities/dialog/hooks/use-current-dialog';

import classes from './channels-list-and-search.module.scss';

export const ChannelsListAndSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const currentDialog = useCurrentDialog();

  return (
    <section className={classes.sidebar}>
      <div className={classes.sidebarHeader}>
        <div>
          <UserOutlined className={classes.icon} />
          <h2>Список диалогов</h2>
        </div>
        <EditOutlined className={classes.icon} />
      </div>

      <Divider />

      <SearchInChannelsInput search={searchQuery} onChange={setSearchQuery} />

      <Divider />

      {!searchQuery ? (
        <DialogsList
          currentDialogId={currentDialog.current?.id}
          onSelectDialog={currentDialog.set}
        />
      ) : (
        <SearchInChannelsResult query={searchQuery} />
      )}
    </section>
  );
};
