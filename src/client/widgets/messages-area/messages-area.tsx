import { createRef, useLayoutEffect } from 'react';

import { MessagesList } from '#/client/entities/message';
import { Message } from '#/domain/message';

import { HasErrorView } from './views/has-error/has-error';
import { LoadingMessagesView } from './views/loading-messages';
import { NoDialogView } from './views/no-dialog';
import { NoMessagesView } from './views/no-messages';

export interface MessageAreaProps {
  messages: Message[];
  noDialog: boolean;
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean;
  onFetchMore(): void;
}

export const MessagesArea = ({
  messages,
  noDialog,
  isError,
  isLoading,
  hasMore,
  onFetchMore,
}: MessageAreaProps) => {
  const bottomElementRef = createRef<HTMLDivElement>();

  useLayoutEffect(() => {
    if (bottomElementRef.current) {
      bottomElementRef.current.scrollIntoView({ behavior: 'instant', block: 'end' });
    }
  }, [bottomElementRef]);

  if (noDialog) {
    return <NoDialogView />;
  }

  if (isLoading) {
    return <LoadingMessagesView />;
  }

  if (!messages.length) {
    return <NoMessagesView />;
  }

  if (isError) {
    return <HasErrorView />;
  }

  return (
    <div
      id="scrollableDiv"
      style={{ overflow: 'auto' }}
      onScroll={hasMore ? onFetchMore : undefined}>
      <MessagesList messages={messages} />

      <div ref={bottomElementRef}></div>
    </div>
  );
};
