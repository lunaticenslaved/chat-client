import { Outlet } from 'react-router-dom';

import { Flex } from 'antd';

export function ErrorLayout() {
  return (
    <Flex align="center" justify="center">
      <Outlet />
    </Flex>
  );
}
