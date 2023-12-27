import { ReactNode, useMemo } from 'react';

import { notReachable } from '#/shared/utils';

import { MessagePlaceholder, UploadFilesMessage } from '../types';

import { MessageWrapper } from './message-wrapper';

interface MessagePlaceholderItemProps {
  avatar(props: { size: string }): ReactNode;
  message: MessagePlaceholder;
  createdAt: string;
}

function UploadFilesPlaceholder({ message }: { message: UploadFilesMessage }) {
  const { files } = message;

  const srcArray = useMemo(() => {
    return files.map(file => URL.createObjectURL(file));
  }, [files]);

  return (
    <>
      {srcArray.map(src => (
        <img key={src} src={src} style={{ height: '400px', width: '400px' }} />
      ))}
    </>
  );
}

export function MessagePlaceholderItem({ message, ...props }: MessagePlaceholderItemProps) {
  if (message.type === 'upload-files') {
    return (
      <MessageWrapper {...props} isMe status="loading">
        <UploadFilesPlaceholder message={message} />
      </MessageWrapper>
    );
  } else {
    notReachable(message.type);
  }
}
