import { Link } from 'react-router-dom';

import { DeleteOutlined } from '@ant-design/icons';
import { Button, Divider, List } from 'antd';

import { ContactListItem } from '#/client/entities/contact';
import { contactsRoutes } from '#/client/pages/root/contacts';
import { Sidebar } from '#/client/shared/components/sidebar';

import { CONTACTS_NAME } from '../constants';
import { useContactsContext } from '../context';

import { SidebarSearchResults } from './contacts-sidebar-search-results';
import { ContactsIcon } from './icons';

export function ContactsSidebar() {
  const { contacts, search, removeContact } = useContactsContext();

  return (
    <Sidebar
      title={CONTACTS_NAME}
      searchQuery={search.query}
      onSearchQueryChange={search.setQuery}
      icon={({ size }) => <ContactsIcon size={size} />}>
      {search.query ? (
        <SidebarSearchResults />
      ) : (
        <>
          <Link to={contactsRoutes.blockedContacts}>To blocked users</Link>
          <Divider />
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
        </>
      )}
    </Sidebar>
  );
}
