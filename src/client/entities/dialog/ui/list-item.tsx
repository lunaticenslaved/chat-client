import { useCallback } from 'react';

import { Flex, Tooltip, Typography } from 'antd';

import { Avatar } from '#/client/shared/components/avatar';
import { ListItem } from '#/client/shared/list-item';
import { Connection, ConnectionType } from '#/domain/connection';
import { formatMessageTime } from '#/domain/message';

// TODO: update time here and in messages fir just send messages
// TODO: add 'you:'  if the last message was sent from viewer

export interface DialogListItemProps {
  dialog: Connection;
  isActive: boolean;
  onClick?(user: Connection): void;
}

export function DialogListItem({ dialog, isActive, onClick }: DialogListItemProps) {
  const handleClick = useCallback(() => onClick?.(dialog), [onClick, dialog]);

  const { lastMessage } = dialog || { lastMessage: undefined };

  if (dialog.type !== ConnectionType.OneToOne) {
    return null;
  }

  const { partner } = dialog.oneToOneDialog;

  return (
    <ListItem
      isActive={isActive}
      onClick={onClick ? handleClick : undefined}
      avatar={<Avatar url={partner.avatar?.link} name={partner.login} />}
      title={
        <Flex justify="space-between" wrap="nowrap">
          <Typography.Text
            style={{
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              paddingRight: '15px',
            }}>
            {partner.login}
          </Typography.Text>
          {!!lastMessage && (
            <Tooltip title={formatMessageTime(lastMessage.createdAt, 'exact')}>
              <Typography.Text
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                {formatMessageTime(lastMessage.createdAt)}
              </Typography.Text>
            </Tooltip>
          )}
        </Flex>
      }
      description={<Typography.Text>{lastMessage?.text}</Typography.Text>}
    />
  );
}
