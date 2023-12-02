export type User = {
  id: string;
  isOnline?: boolean;
  login: string;
  email: string;
  avatar: {
    id: string;
    link: string;
  } | null;
};
