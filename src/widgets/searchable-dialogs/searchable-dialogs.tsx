import { useState } from 'react';

import { EditOutlined, UserOutlined } from '@ant-design/icons';

import classes from './searchable-dialogs.module.scss';
import { DialogsList, DialogsSearch, useDialogs } from '@/entities/dialog';
import { Divider } from '@/shared/components/divider';

export const SearchableDialogs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isError, isFetching, dialogs, currentDialog, selectDialog } = useDialogs({
    searchQuery,
  });

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

      <DialogsSearch search={searchQuery} onChange={setSearchQuery} />

      <Divider />

      <DialogsList
        dialogs={dialogs || []}
        isError={isError}
        isLoading={isFetching}
        currentDialogId={currentDialog?.id}
        onSelectDialog={selectDialog}
      />
    </section>
  );
};
