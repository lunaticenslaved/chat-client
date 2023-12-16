import { ReactNode } from 'react';

import { Flex } from 'antd';

import { useViewer } from '#/client/entities/viewer';
import { Divider } from '#/client/shared/components/divider';

import { TheNavbar } from '../../ui/the-navbar';

export type ChatLayoutProps = {
  children: ReactNode;
};

export const BaseLayout = ({ children }: ChatLayoutProps) => {
  const viewer = useViewer();

  if (!viewer.user) return;

  return (
    <Flex style={{ height: '100%' }}>
      <TheNavbar />

      <Divider vertical />

      <main style={{ height: '100%' }}>{children}</main>
    </Flex>
  );
};
