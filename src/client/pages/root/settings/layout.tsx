import { Outlet } from 'react-router-dom';

import { Flex } from 'antd';

import { SettingsSidebar } from '#/client/features/settings';

export function SettingsLayout() {
  return (
    <Flex style={{ height: '100%', width: '100%' }}>
      <SettingsSidebar />

      <div style={{ flex: '1 1 auto' }}>
        <Outlet />
      </div>
    </Flex>
  );
}
