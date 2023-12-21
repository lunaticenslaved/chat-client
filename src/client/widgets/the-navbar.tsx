import { Fragment, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import { PhoneOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, theme } from 'antd';

import { useViewer } from '#/client/entities/viewer';
import { LogoutButton } from '#/client/features/auth';
import { ContactsIcon } from '#/client/features/contacts';
import { MessengerIcon } from '#/client/features/messenger';
import { SETTINGS_TITLE, SettingsIcon } from '#/client/features/settings';
import { chatRoutes } from '#/client/pages/root/chat';
import { contactsRoutes } from '#/client/pages/root/contacts';
import { settingsRoutes } from '#/client/pages/root/settings';
import { Avatar } from '#/client/shared/components/avatar';

const ICON_SIZE = '20px';

const sections: Array<{
  title: string;
  to: string;
  icon: ReactNode;
}>[] = [
  [
    {
      title: 'Chat',
      to: chatRoutes.chat,
      icon: <MessengerIcon size={ICON_SIZE} />,
    },
    {
      title: 'Contacts',
      to: contactsRoutes.contacts,
      icon: <ContactsIcon size={ICON_SIZE} />,
    },
    {
      title: 'Phone',
      to: '/',
      icon: <PhoneOutlined style={{ fontSize: ICON_SIZE }} />,
    },
  ],
  [
    {
      title: SETTINGS_TITLE,
      to: settingsRoutes.settings,
      icon: <SettingsIcon size={ICON_SIZE} />,
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
      <Avatar name={viewer.login} src={viewer.avatar?.link} />

      <Flex vertical align="center" flex="1 1 auto" style={{ padding: '40px 0', width: '100%' }}>
        {sections.map((section, index) => {
          return (
            <Fragment key={index}>
              {section.map(({ title, to, icon }, index) => (
                <NavLink key={title} to={to}>
                  {({ isActive }) => (
                    <Button
                      type={isActive ? 'primary' : 'text'}
                      icon={icon}
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
            </Fragment>
          );
        })}
      </Flex>

      <LogoutButton />
    </Flex>
  );
}
