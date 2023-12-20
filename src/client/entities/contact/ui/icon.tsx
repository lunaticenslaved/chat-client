import { UserAddOutlined } from '@ant-design/icons';

type IconProps = {
  size: string;
};

export function AddContactIcon({ size }: IconProps) {
  return <UserAddOutlined style={{ fontSize: size }} />;
}
