import { ReactNode } from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { Divider, Flex, Input, Typography, theme } from 'antd';

type IconProps = {
  size: string;
};

export type SidebarProps = {
  title: ReactNode;
  children: ReactNode;
  icon(props: IconProps): ReactNode;
  searchQuery?: string;
  onSearchQueryChange?(value: string): void;
};

export function Sidebar({ title, children, icon, searchQuery, onSearchQueryChange }: SidebarProps) {
  const { getDesignToken } = theme;
  const token = getDesignToken();

  return (
    <>
      <div style={{ width: '400px', padding: '30px 20px', background: token.colorBgTextHover }}>
        <Flex align="center" justify="between" style={{ width: '100%' }}>
          <Typography.Title level={3} style={{ flex: '1 1 auto', margin: 0 }}>
            {title}
          </Typography.Title>
          {icon({ size: '25px' })}
        </Flex>
        <div style={{ padding: '20px 0' }}>
          {!!(searchQuery || onSearchQueryChange) && (
            <Input
              value={searchQuery}
              onChange={e => onSearchQueryChange?.(e.currentTarget.value)}
              allowClear
              placeholder="Search"
              style={{ height: '50px', marginBottom: '20px' }}
              prefix={<SearchOutlined style={{ fontSize: '20px' }} />}
            />
          )}
          {children}
        </div>
      </div>
      <Divider type="vertical" style={{ height: '100%', margin: 0 }} />
    </>
  );
}
