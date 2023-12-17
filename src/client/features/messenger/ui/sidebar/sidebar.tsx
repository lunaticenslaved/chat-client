import { Divider } from 'antd';

import { DialogsList } from '#/client/entities/dialog';
import { Connection } from '#/domain/connection';
import { User } from '#/domain/user';

import { SearchInput } from '../search-input/search';
import { SearchResults } from '../search-results/search-results';

import classes from './sidebar.module.scss';

export type MessengerSidebarProps = {
  query?: string;
  foundConnections: Connection[];
  foundUsers: User[];
  connections: Connection[];
  onQueryChange(value: string): void;
  onConnectionClick(value: Connection): void;
  onUserClick(value: User): void;
};

export function MessengerSidebar({
  query,
  onQueryChange,
  foundConnections,
  foundUsers,
  connections,
  onConnectionClick,
  onUserClick,
}: MessengerSidebarProps) {
  return (
    <aside className={classes.sidebar}>
      <SearchInput search={query || ''} onChange={onQueryChange} />

      <Divider />

      <div style={{ overflowY: 'auto' }}>
        {!query ? (
          <DialogsList dialogs={connections} onClick={onConnectionClick} />
        ) : (
          <SearchResults
            connections={foundConnections}
            users={foundUsers}
            onUserClick={onUserClick}
            onConnectionClick={onConnectionClick}
          />
        )}
      </div>
    </aside>
  );
}
