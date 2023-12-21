import { Sidebar } from '#/client/shared/components/sidebar';

import { MESSENGER_TITLE } from '../constants';
import { useMessengerContext } from '../context';
import { SelectedItem } from '../types';

import { ConnectionsList } from './connections-list';
import { MessengerIcon } from './icons';
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
    <Sidebar
      title={MESSENGER_TITLE}
      icon={({ size }) => <MessengerIcon size={size} />}
      searchQuery={searchQuery}
      onSearchQueryChange={setSearchQuery}>
      <div style={{ overflowY: 'auto' }}>
        {!searchQuery ? (
          <ConnectionsList
            connections={connections}
            onClick={setSelectedConnection}
            selectedConnectionId={getConnectionId(selectedItem)}
          />
        ) : (
          <SearchResults />
        )}
      </div>
    </Sidebar>
  );
}
