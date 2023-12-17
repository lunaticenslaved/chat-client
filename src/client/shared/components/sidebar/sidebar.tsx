import { ReactNode } from 'react';

import { Divider, Flex, Typography } from 'antd';

type IconProps = {
  size: string;
};

export type SidebarProps = {
  title: string;
  children: ReactNode;
  icon(props: IconProps): ReactNode;
};

export function Sidebar({ title, children, icon }: SidebarProps) {
  return (
    <>
      <div style={{ width: '300px', padding: '30px 20px' }}>
        <Flex align="center" justify="between" style={{ width: '100%' }}>
          <Typography.Title level={3} style={{ flex: '1 1 auto', margin: 0 }}>
            {title}
          </Typography.Title>
          {icon({ size: '30px' })}
        </Flex>
        <div style={{ padding: '20px 0' }}>{children}</div>
      </div>
      <Divider type="vertical" style={{ height: '100%' }} />
    </>
  );
}
