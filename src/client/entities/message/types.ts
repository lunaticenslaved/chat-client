export interface MessageModel {
  id: number;
  isRead: boolean;
  text: string;
  createdAt: string;
  attachments: AttachmentModel[];
  author: {
    id: string;
    name: string;
    avatar: string;
  };
}

export interface AttachmentModel {
  id: number;
  filename: string;
  url: string;
  type: 'image' | 'audio';
}
