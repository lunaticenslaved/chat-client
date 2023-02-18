export interface MessageModel {
  id: number;
  sender: {
    id: number;
    name: string;
    avatar: string;
  };
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
