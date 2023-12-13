import { Connection } from '#/domain/connection';
import { User } from '#/domain/user';

export type SearchInChannelsRequest = {
  search: string;
};

export type SearchInChannelsResponse = {
  connections: Connection[];
  users: User[];
};
