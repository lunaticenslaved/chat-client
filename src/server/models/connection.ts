import { ConnectionType, OneToOneConnection as OneToOneConnectionBase } from '#/domain/connection';
import { OneToOneConnection as OneToOneConnectionClient } from '#/domain/connection';
import { Message } from '#/domain/message';
import { User } from '#/domain/user';

export type GroupConnection = {
  type: ConnectionType.Group;
  id: string;
  lastMessage?: Message;
};

export type OneToOneConnection = Omit<OneToOneConnectionBase, 'user'> & {
  users: User[];
};

export type Connection = OneToOneConnection | GroupConnection;

export function prepareOneToOneConnectionToSend(
  currentUserId: string,
  connectionFromServer: OneToOneConnection,
): OneToOneConnectionClient {
  const { users, ...connection } = connectionFromServer;

  const partner = users.find(({ id }) => currentUserId !== id);

  if (!partner) {
    throw new Error('Partner not found');
  }

  return {
    ...connection,
    user: partner,
  };
}
