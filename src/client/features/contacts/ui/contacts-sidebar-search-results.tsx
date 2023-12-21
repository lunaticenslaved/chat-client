import { PlusOutlined } from '@ant-design/icons';
import { Button, Empty, List } from 'antd';

import { ContactListItem } from '#/client/entities/contact';
import { UserListItem } from '#/client/entities/user/ui/list-item';
import { SidebarSection } from '#/client/shared/components/sidebar';

import { useContactsContext } from '../context';

export function SidebarSearchResults() {
  const { search, removeContact, addContact } = useContactsContext();

  // TODO add loading

  if (!search.myContacts.length && !search.users.length) {
    return <Empty />;
  }

  return (
    <>
      {!!search.users.length && (
        <SidebarSection title="Users">
          <List
            dataSource={search.users}
            renderItem={user => (
              <UserListItem
                user={user}
                actions={[
                  <Button
                    key="add"
                    size="small"
                    type="text"
                    onClick={() => addContact(user.id)}
                    icon={<PlusOutlined />}
                  />,
                ]}
              />
            )}
          />
        </SidebarSection>
      )}
      {!!search.myContacts.length && (
        <SidebarSection title="My contacts">
          <List
            dataSource={search.myContacts}
            renderItem={contact => (
              <ContactListItem onDelete={contact => removeContact(contact.id)} contact={contact} />
            )}
          />
        </SidebarSection>
      )}
    </>
  );
}
