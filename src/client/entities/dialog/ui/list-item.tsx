import { useCallback } from 'react';

import { List, Typography } from 'antd';

import { Avatar } from '#/client/shared/components/avatar';
import { Dialog } from '#/domain/dialog';

export interface DialogListItemProps {
  dialog: Dialog;
  onClick?(user: Dialog): void;
}

export function DialogListItem({ dialog, onClick }: DialogListItemProps) {
  const { user } = dialog;
  const handleClick = useCallback(() => onClick?.(dialog), [onClick, dialog]);

  return (
    <List.Item onClick={onClick ? handleClick : undefined}>
      <List.Item.Meta
        avatar={<Avatar url={user.avatar?.link} name={user.login} />}
        title={<Typography.Title level={5}>{user.login}</Typography.Title>}
        description={<Typography.Paragraph>{user.email}</Typography.Paragraph>}
      />
    </List.Item>
  );
}
