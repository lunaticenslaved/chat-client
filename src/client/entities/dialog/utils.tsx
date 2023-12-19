import { ReactNode } from 'react';

import { UserOutlined } from '@ant-design/icons';

import { Connection, ConnectionType } from '#/domain/connection';
import { notReachable } from '#/shared/utils';

type ConnectionMetadata = {
  type: ConnectionType;
  icon: (size?: string) => ReactNode;
  avatar?: string;
  title: string;
  subtitle?: string;
};

export function getConnectionMetadata(connection: Connection): ConnectionMetadata {
  if (connection.type === ConnectionType.OneToOne) {
    const { partner } = connection.oneToOneDialog;

    return {
      type: ConnectionType.OneToOne,
      avatar: partner.avatar?.link,
      title: partner.login,
      subtitle: partner.email,
      icon: fontSize => <UserOutlined style={{ fontSize }} />,
    };
  } else if (connection.type === ConnectionType.Group) {
    throw new Error('Not implemented');
  } else {
    notReachable(connection);
  }
}
