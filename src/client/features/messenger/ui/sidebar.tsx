import { SearchOutlined } from '@ant-design/icons';
import { Divider, Input } from 'antd';

import { DialogsList } from '#/client/entities/dialog';
import { Sidebar } from '#/client/shared/components/sidebar';

import { MESSENGER_TITLE } from '../constants';
import { useMessengerContext } from '../context';
import { SelectedItem } from '../types';

import { MessengerIcon } from './icon';
import { SearchResults } from './search-results';

function getConnectionId(selectedItem?: SelectedItem) {
  if (selectedItem?.type === 'connection') {
    return selectedItem.connection.id;
  }

  return undefined;
}

export function MessengerSidebar() {
  const { searchQuery, setSearchQuery, connections, setSelectedConnection, selectedItem } =
    useMessengerContext();

  return (
    <Sidebar title={MESSENGER_TITLE} icon={({ size }) => <MessengerIcon size={size} />}>
      <Input
        value={searchQuery}
        onChange={e => setSearchQuery(e.currentTarget.value)}
        allowClear
        placeholder="Search"
        style={{ height: '50px' }}
        prefix={<SearchOutlined style={{ fontSize: '25px' }} />}
      />

      <Divider />

      <div style={{ overflowY: 'auto' }}>
        {!searchQuery ? (
          <DialogsList
            dialogs={connections}
            onClick={setSelectedConnection}
            currentConnectionId={getConnectionId(selectedItem)}
          />
        ) : (
          <SearchResults />
        )}
      </div>
    </Sidebar>
  );
}
