import {
  UIEventHandler,
  createRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

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
  const [scrolledToBottom, setScrolledToBottom] = useState(false);

  const scrollArea = createRef<HTMLDivElement>();
  const bottomElementRef = createRef<HTMLDivElement>();
  const topElementRef = createRef<HTMLDivElement>();
  const scrollBottom = useRef(0);

  useEffect(() => {
    const area = scrollArea.current;
    const element = topElementRef.current;

    if (!area) return;
    if (!element) return;
    if (!scrolledToBottom) return;

    const options = {
      root: area,
      rootMargin: '0px',
      threshold: 1.0,
    };
    const io = new IntersectionObserver(([{ isIntersecting }]) => {
      if (hasMore && isIntersecting) {
        onFetchMore();
      }
    }, options);

    io.observe(element);

    return () => {
      if (element) {
        io.unobserve(element);
      }
    };
  }, [hasMore, onFetchMore, scrollArea, scrolledToBottom, topElementRef]);

  useEffect(() => {
    if (!scrollArea.current) return;

    const scrollTop = (scrollArea.current.scrollHeight ?? 0) - scrollBottom.current;

    scrollArea.current.scrollTo({ top: scrollTop, behavior: 'instant' });
    scrollArea.current.scrollTop = scrollTop;
  }, [scrollArea, messages]);

  useLayoutEffect(() => {
    if (bottomElementRef.current && !scrolledToBottom) {
      bottomElementRef.current.scrollIntoView({ behavior: 'instant', block: 'end' });
      setScrolledToBottom(true);
    }
  }, [bottomElementRef, scrolledToBottom]);

  const setScrollBottom: UIEventHandler<HTMLDivElement> = useCallback(event => {
    scrollBottom.current =
      (event.currentTarget.scrollHeight ?? 0) - (event.currentTarget.scrollTop ?? 0);
  }, []);

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
    <div style={{ overflow: 'auto' }} ref={scrollArea} onScroll={setScrollBottom}>
      {scrolledToBottom && <div ref={topElementRef} style={{ height: '10px' }}></div>}

      <MessagesList messages={messages} />

      <div ref={bottomElementRef}></div>
    </div>
  );
};
