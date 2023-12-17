import { UserOutlined } from '@ant-design/icons';

type UserIconProps = {
  size: string;
};

export function UserIcon({ size }: UserIconProps) {
  return <UserOutlined style={{ fontSize: size }} />;
}
