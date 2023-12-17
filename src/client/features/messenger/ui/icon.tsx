import { MessageOutlined } from '@ant-design/icons';

type MessengerIcon = {
  size: string;
};

export function MessengerIcon({ size }: MessengerIcon) {
  return <MessageOutlined style={{ fontSize: size }} />;
}
