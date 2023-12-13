import { Message } from './message';
import { User } from './user';

export enum ConnectionType {
  OneToOne = 'one-to-one',
  Group = 'group',
}

export type GroupConnection = {
  type: ConnectionType.Group;
  id: string;
  lastMessage?: Message;
};

export type OneToOneConnection = {
  type: ConnectionType.OneToOne;
  id: string;
  lastMessage?: Message;
  user: User;
  oneToOneDialog: {
    id: string;
  };
};

export type Connection = OneToOneConnection | GroupConnection;
