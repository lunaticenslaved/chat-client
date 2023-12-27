import { Message } from '#/domain/message';

export interface UploadFilesMessage {
  isPlaceholder: boolean;
  id: string;
  type: 'upload-files';
  files: File[];
}

export type MessagePlaceholder = UploadFilesMessage;

export function isMessagePlaceholder(
  message: Message | MessagePlaceholder,
): message is MessagePlaceholder {
  return 'isPlaceholder' in message;
}
