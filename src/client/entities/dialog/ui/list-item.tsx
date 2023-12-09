import { useCallback } from 'react';

import { Flex, List, Tooltip, Typography } from 'antd';

import { Avatar } from '#/client/shared/components/avatar';
import { Dialog, isExistingDialog } from '#/domain/dialog';
import { formatMessageTime } from '#/domain/message';

export interface DialogListItemProps {
  dialog: Dialog;
  onClick?(user: Dialog): void;
}

const style = {
  padding: '10px 20px',
  cursor: 'pointer',
};

export function DialogListItem({ dialog, onClick }: DialogListItemProps) {
  const { user } = dialog;
  const handleClick = useCallback(() => onClick?.(dialog), [onClick, dialog]);

  const { lastMessage } = isExistingDialog(dialog) ? dialog : { lastMessage: undefined };

  return (
    <List.Item style={style} onClick={onClick ? handleClick : undefined}>
      <List.Item.Meta
        avatar={<Avatar url={user.avatar?.link} name={user.login} />}
        title={
          <Flex justify="space-between">
            <Typography.Title level={5}>{user.login}</Typography.Title>
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
