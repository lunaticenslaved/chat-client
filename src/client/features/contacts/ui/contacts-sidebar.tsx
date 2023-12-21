import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { Divider, Form, Input, List, Modal } from 'antd';

import { Validators } from '@lunaticenslaved/schema';

import { ContactListItem as ContactListItemBase, getContactName } from '#/client/entities/contact';
import { contactsRoutes } from '#/client/pages/root/contacts';
import { Sidebar } from '#/client/shared/components/sidebar';
import { useDialog, useToggle } from '#/client/shared/hooks';
import { createAntdValidator } from '#/client/shared/lib/validators';
import { Contact } from '#/domain/contact';

import { CONTACTS_NAME } from '../constants';
import { UpdateContactData, useContactsContext } from '../context';

import { SidebarSearchResults } from './contacts-sidebar-search-results';
import { ContactsIcon } from './icons';

interface ContactListItemProps {
  contact: Contact;
  onDelete(contactId: string): void;
  onUpdate(contactId: string, data: UpdateContactData): void;
}

interface Values {
  name: string;
}

function ContactListItem({ contact, onDelete, onUpdate }: ContactListItemProps) {
  const [form] = Form.useForm<Values>();
  const dialog = useDialog();
  const isLoading = useToggle();
  const name = getContactName(contact);
  const handleUpdate = useCallback(
    (values: Values) => {
      onUpdate(contact.id, values);
      dialog.close();
    },
    [contact.id, dialog, onUpdate],
  );

  return (
    <>
      <Modal open={dialog.isOpen} onCancel={dialog.close} onOk={form.submit} destroyOnClose>
        <Form<Values>
          form={form}
          layout="vertical"
          initialValues={{ name }}
          disabled={isLoading.value}
          onFinish={handleUpdate}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ validator: createAntdValidator(Validators.required('Name is required')) }]}
            hasFeedback>
            <Input placeholder="Name" width="100%" />
          </Form.Item>
        </Form>
      </Modal>
      <ContactListItemBase
        contact={contact}
        onEdit={dialog.open}
        onDelete={contact => onDelete(contact.id)}
      />
    </>
  );
}

export function ContactsSidebar() {
  const { contacts, search, removeContact, updateContact } = useContactsContext();

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
                onUpdate={updateContact}
                onDelete={removeContact}
              />
            )}
          />
        </>
      )}
    </Sidebar>
  );
}
