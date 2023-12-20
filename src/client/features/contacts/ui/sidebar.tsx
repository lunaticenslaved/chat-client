import { DeleteOutlined } from '@ant-design/icons';
import { Button, List } from 'antd';

import { AddContactIcon, ContactListItem } from '#/client/entities/contact';
import { Sidebar } from '#/client/shared/components/sidebar';

import { CONTACTS_NAME } from '../constants';
import { useContactsContext } from '../context';

import { SidebarSearchResults } from './sidebar-search-results';

export function ContactsSidebar() {
  const { contacts, search, removeContact } = useContactsContext();

  return (
    <Sidebar
      title={CONTACTS_NAME}
      searchQuery={search.query}
      onSearchQueryChange={search.setQuery}
      icon={({ size }) => <AddContactIcon size={size} />}>
      {search.query ? (
        <SidebarSearchResults />
      ) : (
        <List
          dataSource={contacts}
          renderItem={contact => (
            <ContactListItem
              contact={contact}
              actions={[
                <Button
                  key="remove"
                  size="small"
                  type="text"
                  onClick={() => removeContact(contact.id)}
                  icon={<DeleteOutlined />}
                />,
              ]}
            />
          )}
        />
      )}
    </Sidebar>
  );
}
