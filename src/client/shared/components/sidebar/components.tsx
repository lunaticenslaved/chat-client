import { PropsWithChildren, ReactNode } from 'react';

import { css } from '@emotion/react';
import { Typography } from 'antd';

interface SidebarSectionProps {
  title: string;
  children: ReactNode;
}

const sectionCSS = css`
  .sidebar-section {
    &:not(:last-child) {
      margin-bottom: 30px;
    }
  }
`;

export function SidebarSection({ title, children }: SidebarSectionProps) {
  return (
    <section className="sidebar-section" css={sectionCSS}>
      <Typography.Title level={4}>{title}</Typography.Title>
      {children}
    </section>
  );
}

export function SidebarFooter({ children }: PropsWithChildren) {
  return <div style={{ height: '60px' }}>{children}</div>;
}
