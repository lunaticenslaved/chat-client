import { Outlet } from 'react-router-dom';

import { Flex } from 'antd';

import { ContactsSidebar } from '#/client/features/contacts';

export function ContactsLayout() {
  return (
    <Flex style={{ height: '100%', width: '100%' }}>
      <ContactsSidebar />

      <div style={{ flex: '1 1 auto' }}>
        <Outlet />
      </div>
    </Flex>
  );
}
