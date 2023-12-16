import { CSSProperties, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import { MessageOutlined, SettingOutlined } from '@ant-design/icons';
import { Flex, theme } from 'antd';

import { useViewer } from '#/client/entities/viewer';
import { LogoutButton } from '#/client/features/auth';
import { Avatar } from '#/client/shared/components/avatar';

const sections: Array<{
  title: string;
  to: string;
  icon: (style: CSSProperties) => ReactNode;
}> = [
  {
    title: 'Chat',
    to: '/',
    icon: style => <MessageOutlined style={style} />,
  },
  {
    title: 'Settings',
    to: '/settings',
    icon: style => <SettingOutlined style={style} />,
  },
];

export function TheNavbar() {
  const { user: viewer } = useViewer();

  const { getDesignToken } = theme;

  const token = getDesignToken();

  if (!viewer) return;

  return (
    <Flex
      component="nav"
      vertical
      justify="space-between"
      align="center"
      style={{
        width: '80px',
        padding: '20px 0',
      }}>
      <Avatar name={viewer.login} url={viewer.avatar?.link} />

      <Flex vertical align="center" flex="1 1 auto" style={{ padding: '40px 0', width: '100%' }}>
        {sections.map(({ title, to, icon }) => {
          return (
            <NavLink key={title} to={to}>
              {({ isActive }) => (
                <Flex
                  align="center"
                  justify="center"
                  style={{
                    height: '50px',
                    width: '50px',
                    borderRadius: '10px',
                    background: isActive ? token.colorPrimary : undefined,
                    marginBottom: '10px',
                  }}>
                  {icon({ fontSize: '25px', color: isActive ? 'white' : 'grey' })}
                </Flex>
              )}
            </NavLink>
          );
        })}
      </Flex>

      <LogoutButton />
    </Flex>
  );
}
