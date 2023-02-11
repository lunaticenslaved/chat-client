export interface MessageModel {
  userName: string;
  avatarUrl: string;
  text: string;
  createdAt: string;
  attachments: AttachmentModel[];
}

export interface AttachmentModel {
  id: number;
  filename: string;
  url: string;
}
