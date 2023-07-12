export interface MessageModel {
  id: number;
  author: UserModel;
  isRead: boolean;
  text: string;
  createdAt: string;
  attachments: AttachmentModel[];
}

export interface AttachmentModel {
  id: number;
  filename: string;
  url: string;
  type: "image" | "audio";
}

export interface UserModel {
  id: number;
  name: string;
  avatar: string | null;
}
