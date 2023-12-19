import { Connection } from '#/domain/connection';

export enum ConnectionServerEvent {
  Created = 'SERVER:CONNECTION:CREATED',
}

export type CreateConnectionResponse = Connection;

export type UpdateConnectionResponse = Connection;

export type ListConnectionsRequest = void;
export type ListConnectionsResponse = {
  connections: Connection[];
};

export type GetConnectionResponse = Connection;
export type GetConnectionRequest = {
  connectionId: string;
};
