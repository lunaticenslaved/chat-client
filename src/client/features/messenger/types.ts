import { Connection } from '#/domain/connection';
import { User } from '#/domain/user';

export type SelectedItem =
  | {
      type: 'user';
      user: User;
    }
  | {
      type: 'connection';
      connection: Connection;
    };
