import { CSSProperties, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import { MessageOutlined, PhoneOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, theme } from 'antd';

import { useViewer } from '#/client/entities/viewer';
import { LogoutButton } from '#/client/features/auth';
import { chatRoutes } from '#/client/pages/root/chat';
import { settingsRoutes } from '#/client/pages/root/settings';
import { Avatar } from '#/client/shared/components/avatar';

const sections: Array<{
  title: string;
  to: string;
  icon: (style: CSSProperties) => ReactNode;
}>[] = [
  [
    {
      title: 'Chat',
      to: chatRoutes.chat,
      icon: style => <MessageOutlined style={style} />,
    },
    {
      title: 'Contacts',
      to: '/',
      icon: style => <UserOutlined style={style} />,
    },
    {
      title: 'Phone',
      to: '/',
      icon: style => <PhoneOutlined style={style} />,
    },
  ],
  [
    {
      title: 'Settings',
      to: settingsRoutes.settings,
      icon: style => <SettingOutlined style={style} />,
    },
  ],
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
        width: '90px',
        padding: '20px 0',
      }}>
      <Avatar name={viewer.login} url={viewer.avatar?.link} />

      <Flex vertical align="center" flex="1 1 auto" style={{ padding: '40px 0', width: '100%' }}>
        {sections.map((section, index) => {
          return (
            <>
              {section.map(({ title, to, icon }, index) => (
                <NavLink key={title} to={to}>
                  {({ isActive }) => (
                    <Button
                      type={isActive ? 'primary' : 'text'}
                      icon={icon({ fontSize: '20px' })}
                      style={{
                        height: '45px',
                        width: '45px',
                        borderRadius: '10px',
                        background: isActive ? token.colorPrimary : undefined,
                        marginBottom: section.length - 1 === index ? '0px' : '10px',
                      }}
                    />
                  )}
                </NavLink>
              ))}

              {sections.length - 1 > index ? (
                <Divider type="horizontal" style={{ width: '60%', minWidth: '60%' }} />
              ) : null}
            </>
          );
        })}
      </Flex>

      <LogoutButton />
    </Flex>
  );
}
