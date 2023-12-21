import { ArrowDownOutlined, LayoutOutlined } from '@ant-design/icons';
import { Button, Flex, Radio, Typography } from 'antd';

import { useUserOnlineStatus } from '#/client/entities/user';
import {
  getTitleFromSelectedItem,
  getUserFromSelectedItem,
} from '#/client/features/messenger/utils';

import { useMessengerContext } from '../../context';
import { SelectedItem } from '../../types';
import { SelectedItemAvatar } from '../avatars';
import { SelectedItemMenu } from '../selected-item-menu';

import classes from './messages-area-header.module.scss';

export type MessageAreaHeaderProps = {
  selectedItem: SelectedItem;
};

export const MessageAreaHeader = ({ selectedItem }: MessageAreaHeaderProps) => {
  const { connectionInfo } = useMessengerContext();
  const { getOnlineStatus } = useUserOnlineStatus();
  const title = getTitleFromSelectedItem(selectedItem);
  const user = getUserFromSelectedItem(selectedItem);
  const isOnline = user ? getOnlineStatus(user.id) : false;

  return (
    <Flex align="center" justify="space-between" className={classes.chatHeader}>
      <Flex>
        <SelectedItemAvatar selectedItem={selectedItem} />

        <Flex align="flex-start" justify="center" vertical style={{ marginLeft: '20px' }}>
          <Typography.Title level={5} style={{ margin: 0 }}>
            {title}
          </Typography.Title>
          <Typography.Text>{isOnline ? 'онлайн' : 'оффлайн'}</Typography.Text>
        </Flex>
      </Flex>

      <Flex align="center">
        <Radio.Group value={connectionInfo.isOpen}>
          <Radio.Button value={true} onClick={connectionInfo.toggle}>
            <LayoutOutlined />
          </Radio.Button>
        </Radio.Group>

        <SelectedItemMenu
          selectedItem={selectedItem}
          activator={<Button icon={<ArrowDownOutlined />} />}
        />
      </Flex>
    </Flex>
  );
};
