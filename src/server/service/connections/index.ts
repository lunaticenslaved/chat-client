import { ConnectionsService } from './service';

export * from './types';
export {
  type Connection,
  type OneToOneConnection,
  type GroupConnection,
  isGroupConnection,
  isOneToOneConnection,
} from './utils';

export const connectionsService = new ConnectionsService();
