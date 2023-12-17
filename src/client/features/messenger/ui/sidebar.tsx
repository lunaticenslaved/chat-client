import { SearchOutlined } from '@ant-design/icons';
import { Divider, Input } from 'antd';

import { DialogsList } from '#/client/entities/dialog';
import { Sidebar } from '#/client/shared/components/sidebar';
import { Connection } from '#/domain/connection';
import { User } from '#/domain/user';

import { MESSENGER_TITLE } from '../constants';

import { MessengerIcon } from './icon';
import { SearchResults } from './search-results';

export type MessengerSidebarProps = {
  query?: string;
  foundConnections: Connection[];
  foundUsers: User[];
  connections: Connection[];
  currentConnection?: Connection;
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
  currentConnection,
}: MessengerSidebarProps) {
  return (
    <Sidebar title={MESSENGER_TITLE} icon={({ size }) => <MessengerIcon size={size} />}>
      <Input
        value={query}
        onChange={e => onQueryChange(e.currentTarget.value)}
        allowClear
        placeholder="Search"
        style={{ height: '50px' }}
        prefix={<SearchOutlined style={{ fontSize: '25px' }} />}
      />

      <Divider />

      <div style={{ overflowY: 'auto' }}>
        {!query ? (
          <DialogsList
            dialogs={connections}
            onClick={onConnectionClick}
            currentConnectionId={currentConnection?.id}
          />
        ) : (
          <SearchResults
            connections={foundConnections}
            users={foundUsers}
            onUserClick={onUserClick}
            onConnectionClick={onConnectionClick}
          />
        )}
      </div>
    </Sidebar>
  );
}
