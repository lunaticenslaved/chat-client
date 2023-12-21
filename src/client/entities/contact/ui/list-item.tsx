import { ReactNode, useCallback } from 'react';

import { Typography } from 'antd';

import { Avatar } from '#/client/shared/components/avatar';
import { ListItem } from '#/client/shared/list-item';
import { Contact } from '#/domain/contact';

interface ContactListItemProps {
  contact: Contact;
  actions?: ReactNode[];
  onClick?(contact: Contact): void;
}

export function ContactListItem({ contact, onClick, actions }: ContactListItemProps) {
  const handleClick = useCallback(() => onClick?.(contact), [onClick, contact]);
  const { user } = contact;

  return (
    <ListItem
      onClick={onClick ? handleClick : undefined}
      isActive={false}
      actions={actions}
      avatar={<Avatar src={user.avatar?.link} name={user.login} />}
      title={<Typography.Text style={{ fontWeight: 'bold' }}>{user.login}</Typography.Text>}
      description={<Typography.Text>{user.email}</Typography.Text>}
    />
  );
}
