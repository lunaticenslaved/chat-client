import { ReactNode } from 'react';

import { Typography } from 'antd';

import classes from './sidebar-section.module.scss';

interface SidebarSectionProps {
  title: string;
  children: ReactNode;
}

export function SidebarSection({ title, children }: SidebarSectionProps) {
  return (
    <section className={classes.sidebarSection}>
      <Typography.Title level={4}>{title}</Typography.Title>
      {children}
    </section>
  );
}
