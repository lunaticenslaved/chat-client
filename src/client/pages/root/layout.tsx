import { Outlet } from 'react-router-dom';

import { Flex } from 'antd';

import { useViewer } from '#/client/entities/viewer';
import { useIsActivatedCheck, useIsAuthorizedCheck } from '#/client/features/auth';
import { Divider } from '#/client/shared/components/divider';
import { TheNavbar } from '#/client/widgets/the-navbar';

export const RootLayout = () => {
  const viewer = useViewer();

  useIsAuthorizedCheck();
  useIsActivatedCheck();

  if (!viewer.user) return;

  return (
    <Flex style={{ height: '100%' }}>
      <TheNavbar />

      <Divider vertical />

      <main style={{ height: '100%', flex: '1 1 auto' }}>
        <Outlet />
      </main>
    </Flex>
  );
};
