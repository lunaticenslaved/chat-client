import { Connection } from '#/domain/connection';
import { Message } from '#/domain/message';
import { User } from '#/domain/user';

export type SelectedItem =
  | {
      type: 'user';
      user: User;
    }
  | {
      type: 'connection';
      connection: Connection;
    };

interface UploadFilesMessage {
  isPlaceholder: boolean;
  id: string;
  type: 'upload-files';
  files: File[];
  createdAt: string;
}

export type MessagePlaceholder = UploadFilesMessage;

export function isMessagePlaceholder(
  message: Message | MessagePlaceholder,
): message is MessagePlaceholder {
  return 'isPlaceholder' in message;
}
