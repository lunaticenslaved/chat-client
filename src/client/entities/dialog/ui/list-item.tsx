import { useCallback } from 'react';

import { Flex, List, Tooltip, Typography } from 'antd';

import { Avatar } from '#/client/shared/components/avatar';
import { Connection, ConnectionType } from '#/domain/connection';
import { formatMessageTime } from '#/domain/message';

export interface DialogListItemProps {
  dialog: Connection;
  onClick?(user: Connection): void;
}

const style = {
  padding: '10px 20px',
  cursor: 'pointer',
};

export function DialogListItem({ dialog, onClick }: DialogListItemProps) {
  const handleClick = useCallback(() => onClick?.(dialog), [onClick, dialog]);

  const { lastMessage } = dialog || { lastMessage: undefined };

  if (dialog.type !== ConnectionType.OneToOne) {
    return null;
  }

  const { partner } = dialog.oneToOneDialog;

  return (
    <List.Item style={style} onClick={onClick ? handleClick : undefined}>
      <List.Item.Meta
        avatar={<Avatar url={partner.avatar?.link} name={partner.login} />}
        title={
          <Flex justify="space-between">
            <Typography.Title level={5}>{partner.login}</Typography.Title>
            {!!lastMessage && (
              <Tooltip title={formatMessageTime(lastMessage.createdAt, 'exact')}>
                <Typography.Text>{formatMessageTime(lastMessage.createdAt)}</Typography.Text>
              </Tooltip>
            )}
          </Flex>
        }
        description={<Typography.Text>{lastMessage?.text}</Typography.Text>}
      />
    </List.Item>
  );
}
