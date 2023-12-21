import { User } from './user';

export interface Contact {
  id: string;
  name?: string;
  user: User;
}
