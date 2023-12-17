import { Flex } from 'antd';

import { useViewer } from '#/client/entities/viewer';

import { EditAccountAvatar } from '../account-edit-avatar';
import { EditAccountData } from '../account-edit-data';

export function SettingsAccount() {
  const { user } = useViewer();

  if (!user) return;

  return (
    <Flex vertical align="center" justify="center" style={{ height: '100%' }}>
      <EditAccountAvatar user={user} />
      <EditAccountData user={user} style={{ marginTop: '60px' }} />
    </Flex>
  );
}
