import { CloseOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Typography, theme } from 'antd';

import { useMessengerContext } from '../../context';
import { ConnectionAvatar, ConnectionSubtitle, ConnectionTitle } from '../common';

import classes from './connection-info.module.scss';

export function ConnectionInfo() {
  const { getDesignToken } = theme;
  const token = getDesignToken();
  const { connectionInfo } = useMessengerContext();

  if (connectionInfo.state === 'loading') {
    return (
      <>
        <Divider type="vertical" style={{ height: '100%', margin: 0 }} />

        <Flex
          component="aside"
          vertical
          style={{ width: '400px', background: token.colorBgTextHover }}>
          Loading...
        </Flex>
      </>
    );
  }

  const { connection } = connectionInfo;

  return (
    <>
      <Divider type="vertical" style={{ height: '100%', margin: 0 }} />

      <Flex
        component="aside"
        vertical
        style={{ width: '400px', background: token.colorBgTextHover }}>
        <Flex justify="space-between" align="center" className={classes.header}>
          <Typography.Title level={4} style={{ margin: 0 }}>
            Dialog info
          </Typography.Title>
          <Button type="text" icon={<CloseOutlined />} onClick={connectionInfo.close} />
        </Flex>

        <div style={{ padding: '20px' }}>
          <Flex align="center">
            <div style={{ margin: '20px' }}>
              <ConnectionAvatar connection={connection} />
            </div>
            <Flex vertical>
              <Typography.Title level={5}>
                <ConnectionTitle connection={connection} />
              </Typography.Title>
              <Typography.Text>
                <ConnectionSubtitle connection={connection} />
              </Typography.Text>
            </Flex>
          </Flex>
        </div>
      </Flex>
    </>
  );
}
