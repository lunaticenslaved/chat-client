import { Outlet } from 'react-router-dom';

import { Flex } from 'antd';

export function ContactsLayout() {
  return (
    <Flex style={{ height: '100%', width: '100%' }}>
      <Outlet />
    </Flex>
  );
}
