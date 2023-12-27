import { Flex, List, Tooltip, Typography } from 'antd';

import { formatMessageTime } from '#/client/entities/message';
import { ListItem } from '#/client/shared/list-item';
import { Connection } from '#/domain/connection';

import { ConnectionAvatar, ConnectionTitle } from './common';

interface ConnectionsListProps {
  selectedConnectionId?: string;
  connections: Connection[];
  onClick?(connection: Connection): void;
}

export function ConnectionsList({
  connections,
  selectedConnectionId,
  onClick,
}: ConnectionsListProps) {
  return (
    <List
      dataSource={connections}
      renderItem={connection => {
        const isActive = selectedConnectionId === connection.id;
        const lastMessage = connection.lastMessage;

        return (
          <ListItem
            isActive={isActive}
            onClick={() => onClick?.(connection)}
            avatar={<ConnectionAvatar connection={connection} />}
            title={
              <Flex justify="space-between" wrap="nowrap">
                <Typography.Text
                  style={{
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    paddingRight: '15px',
                  }}>
                  <ConnectionTitle connection={connection} />
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
      }}
    />
  );
}
