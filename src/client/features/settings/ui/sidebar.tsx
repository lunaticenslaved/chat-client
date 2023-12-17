import { NavLink } from 'react-router-dom';

import { Button, List } from 'antd';

import { settingsRoutes } from '#/client/pages/root/settings';
import { Sidebar } from '#/client/shared/components/sidebar';

import { SETTINGS_TITLE } from '../constants';

import {
  SettingsAccountIcon,
  SettingsAppearanceIcon,
  SettingsIcon,
  SettingsSessionsIcon,
} from './icons';

const ICON_SIZE = '25px';

const items = [
  {
    title: 'Account',
    to: settingsRoutes.accountSettings,
    icon: <SettingsAccountIcon size={ICON_SIZE} />,
  },
  {
    title: 'Appearance',
    to: settingsRoutes.appearanceSettings,
    icon: <SettingsAppearanceIcon size={ICON_SIZE} />,
  },
  {
    title: 'Sessions',
    to: settingsRoutes.sessionsSettings,
    icon: <SettingsSessionsIcon size={ICON_SIZE} />,
  },
];

export function SettingsSidebar() {
  return (
    <Sidebar title={SETTINGS_TITLE} icon={({ size }) => <SettingsIcon size={size} />}>
      <List>
        {items.map(item => (
          // FIXME shit button in link
          <NavLink key={item.title} to={item.to} tabIndex={-1}>
            {({ isActive }) => (
              <Button
                icon={item.icon}
                type={isActive ? 'primary' : 'text'}
                style={{
                  width: '100%',
                  justifyContent: 'flex-start',
                  height: '60px',
                  marginBottom: '10px',
                }}>
                {item.title}
              </Button>
            )}
          </NavLink>
        ))}
      </List>
    </Sidebar>
  );
}
