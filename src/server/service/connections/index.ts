import { ConnectionsService } from './service';

export * from './types';
export type { Connection, OneToOneConnection } from './utils';

export const connectionsService = new ConnectionsService();
