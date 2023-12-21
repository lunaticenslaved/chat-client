export type User = {
  id: string;
  login: string;
  email: string;
  avatar: {
    id: string;
    link: string;
  } | null;
};
