import { Flex, List, Tooltip, Typography } from 'antd';

import { ListItem } from '#/client/shared/list-item';
import { Connection } from '#/domain/connection';
import { formatMessageTime } from '#/domain/message';

import { getConnectionTitles } from '../utils';

import { ConnectionAvatar } from './avatars';

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
        const { title } = getConnectionTitles(connection);
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
                  {title}
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
