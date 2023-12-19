import { LayoutOutlined } from '@ant-design/icons';
import { Flex, Radio, Typography } from 'antd';

import { OnlineStatus } from '#/client/shared/components/online-status';
import { ConnectionType } from '#/domain/connection';
import { notReachable } from '#/shared/utils';

import { useMessengerContext } from '../../context';
import { SelectedItem } from '../../types';

import classes from './messages-area-header.module.scss';

export type MessageAreaHeaderProps = {
  selectedItem: SelectedItem;
  isOnline: boolean;
};

function getTitle(selectedItem: SelectedItem): string {
  if (selectedItem.type === 'user') {
    return selectedItem.user.login;
  } else if (selectedItem.type === 'connection') {
    const connection = selectedItem.connection;

    if (connection.type === ConnectionType.OneToOne) {
      return connection.oneToOneDialog.partner.login;
    } else if (connection.type === ConnectionType.Group) {
      return 'Not implemented';
    } else {
      notReachable(connection);
    }
  } else {
    notReachable(selectedItem);
  }
}

export const MessageAreaHeader = ({ selectedItem, isOnline }: MessageAreaHeaderProps) => {
  const title = getTitle(selectedItem);
  const { connectionInfo } = useMessengerContext();

  return (
    <Flex align="center" justify="space-between" className={classes.chatHeader}>
      <Flex align="flex-start" justify="center" vertical>
        <Typography.Title level={5} style={{ margin: 0 }}>
          {title}
        </Typography.Title>
        <div className={classes.onlineStatus}>
          <OnlineStatus isOnline={isOnline} />
          <Typography.Text>{isOnline ? 'онлайн' : 'оффлайн'}</Typography.Text>
        </div>
      </Flex>

      <Flex align="center">
        <Radio.Group value={connectionInfo.isOpen}>
          <Radio.Button value={true} onClick={connectionInfo.toggle}>
            <LayoutOutlined />
          </Radio.Button>
        </Radio.Group>
      </Flex>
    </Flex>
  );
};
