import { Connection } from '#/domain/connection';

export enum ConnectionServerEvent {
  Created = 'SERVER:CONNECTION:CREATED',
  Updated = 'SERVER:CONNECTION:UPDATED',
}

export type CreateConnectionResponse = Connection;

export type UpdateConnectionResponse = Connection;

export type ListConnectionsRequest = void;
export type ListConnectionsResponse = {
  connections: Connection[];
};
