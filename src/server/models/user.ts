export type User = {
  id: string;
  isOnline: boolean;
  sockets: { id: string }[];
};
