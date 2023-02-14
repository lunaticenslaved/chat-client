export interface DialogModel {
  id: number;
  notReadMessages: number;
  user: {
    id: number;
    name: string;
    avatar?: string | null;
    isOnline: boolean;
  };
  lastMessage: {
    senderId: number;
    time: string;
    text: string;
    isRead: boolean;
  };
}
