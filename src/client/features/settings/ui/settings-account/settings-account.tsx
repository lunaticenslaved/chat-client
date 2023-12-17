import { Flex } from 'antd';

import { EditAvatar } from '../edit-avatar';

export function SettingsAccount() {
  return (
    <Flex vertical align="center" justify="center" style={{ height: '100%' }}>
      <EditAvatar />
    </Flex>
  );
}
