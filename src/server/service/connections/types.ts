export type CreateOneToOneRequest = {
  authorId: string;
  partnerId: string;
};

export type ListConnectionsRequest = { userId: string };

export type GetConnectionRequest = { connectionId: string };

export interface FindOneToOneConnectionRequest {
  userId1: string;
  userId2: string;
}

export interface CanSendMessageToConnectionRequest {
  userId: string;
  connectionId: string;
}
