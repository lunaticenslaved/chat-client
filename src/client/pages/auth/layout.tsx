import { Outlet } from 'react-router-dom';

import { Flex } from 'antd';

export function AuthLayout() {
  return (
    <Flex style={{ width: '100%', height: '100%' }} vertical align="center" justify="center">
      <Outlet />
    </Flex>
  );
}
