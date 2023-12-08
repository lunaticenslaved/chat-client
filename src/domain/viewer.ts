import { User } from './user';

export type Viewer = User & {
  isActivated: boolean;
};
