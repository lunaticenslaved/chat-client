import {
  DesktopOutlined,
  FormatPainterOutlined,
  IdcardOutlined,
  SettingOutlined,
} from '@ant-design/icons';

export type SettingsIconProps = {
  size: string;
};

export function SettingsIcon({ size }: SettingsIconProps) {
  return <SettingOutlined style={{ fontSize: size }} />;
}

export function SettingsAccountIcon({ size }: SettingsIconProps) {
  return <IdcardOutlined style={{ fontSize: size }} />;
}

export function SettingsAppearanceIcon({ size }: SettingsIconProps) {
  return <FormatPainterOutlined style={{ fontSize: size }} />;
}

export function SettingsSessionsIcon({ size }: SettingsIconProps) {
  return <DesktopOutlined style={{ fontSize: size }} />;
}
