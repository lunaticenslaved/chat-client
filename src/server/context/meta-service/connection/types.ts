import { Connection, OneToOneConnection } from '#/server/models/connection';

export type CreateOneToOneResponse = OneToOneConnection;
export type CreateOneToOneRequest = {
  partnerId: string;
  message?: {
    text: string;
  };
};

export type ListConnectionsRequest = { userId: string };
export type ListConnectionsResponse = Connection[];

export type GetConnectionRequest = { connectionId: string };
export type GetConnectionResponse = Connection;
