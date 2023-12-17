import { ConnectionType, OneToOneConnection as OneToOneConnectionBase } from '#/domain/connection';
import { Connection as ConnectionClient } from '#/domain/connection';
import { Message } from '#/domain/message';
import { User } from '#/domain/user';

export type GroupConnection = {
  type: ConnectionType.Group;
  id: string;
  lastMessage?: Message;
};

export type OneToOneConnection = Omit<OneToOneConnectionBase, 'oneToOneDialog'> & {
  users: User[];
  oneToOneDialog: {
    id: string;
  };
};

export type Connection = OneToOneConnection | GroupConnection;

export function prepareConnectionToSend(
  currentUserId: string,
  connectionFromServer: Connection,
): ConnectionClient {
  if (connectionFromServer.type === ConnectionType.OneToOne) {
    const { users, ...connection } = connectionFromServer;

    const partner = users.find(({ id }) => currentUserId !== id);

    if (!partner) {
      throw new Error('Partner not found');
    }

    return {
      ...connection,
      oneToOneDialog: {
        ...connection.oneToOneDialog,
        partner,
      },
    };
  } else {
    throw new Error('Not implemented!');
  }
}
