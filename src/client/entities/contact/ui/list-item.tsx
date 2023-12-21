import { useCallback } from 'react';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';

import { Avatar } from '#/client/shared/components/avatar';
import { ListItem } from '#/client/shared/list-item';
import { Contact } from '#/domain/contact';

import { getContactName } from '../utils';

interface ContactListItemProps {
  contact: Contact;
  onClick?(contact: Contact): void;
  onDelete?(contact: Contact): void;
  onEdit?(contact: Contact): void;
}

export function ContactListItem({ contact, onClick, onDelete, onEdit }: ContactListItemProps) {
  const handleClick = useCallback(() => onClick?.(contact), [onClick, contact]);
  const { user } = contact;
  const name = getContactName(contact);

  const actions = [
    onDelete ? (
      <Button
        key="remove"
        size="small"
        type="text"
        onClick={() => onDelete(contact)}
        icon={<DeleteOutlined />}
      />
    ) : undefined,
    onEdit ? (
      <Button
        key="edit"
        size="small"
        type="text"
        onClick={() => onEdit(contact)}
        icon={<EditOutlined />}
      />
    ) : undefined,
  ];

  return (
    <ListItem
      onClick={onClick ? handleClick : undefined}
      isActive={false}
      actions={actions.filter(Boolean)}
      avatar={<Avatar src={user.avatar?.link} name={name} />}
      title={<Typography.Text style={{ fontWeight: 'bold' }}>{name}</Typography.Text>}
      description={<Typography.Text>{user.email}</Typography.Text>}
    />
  );
}
