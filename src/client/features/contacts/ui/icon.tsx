import { UserOutlined } from '@ant-design/icons';

type IconProps = {
  size: string;
};

export function ContactsIcon({ size }: IconProps) {
  return <UserOutlined style={{ fontSize: size }} />;
}
