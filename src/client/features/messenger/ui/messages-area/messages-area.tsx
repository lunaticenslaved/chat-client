import {
  UIEventHandler,
  createRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { Flex } from 'antd';

import { MessagesList } from '#/client/entities/message';

import { useMessengerContext } from '../../context';

import { HasErrorView } from './views/has-error/has-error';
import { LoadingMessagesView } from './views/loading-messages';
import { NoDialogView } from './views/no-dialog';
import { NoMessagesView } from './views/no-messages';

export const MessagesArea = () => {
  const {
    messages,
    isLoadingMessages,
    isLoadingMessagesError,
    hasMoreMessages,
    fetchMoreMessages,
    selectedItem,
  } = useMessengerContext();
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
      if (hasMoreMessages && isIntersecting) {
        fetchMoreMessages();
      }
    }, options);

    io.observe(element);

    return () => {
      if (element) {
        io.unobserve(element);
      }
    };
  }, [fetchMoreMessages, hasMoreMessages, scrollArea, scrolledToBottom, topElementRef]);

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

  if (!selectedItem) {
    return <NoDialogView />;
  }

  if (isLoadingMessages) {
    return <LoadingMessagesView />;
  }

  if (!messages.length) {
    return <NoMessagesView />;
  }

  if (isLoadingMessagesError) {
    return <HasErrorView />;
  }

  return (
    <Flex
      vertical
      style={{ overflow: 'auto', flex: '1 1 auto' }}
      ref={scrollArea}
      onScroll={setScrollBottom}>
      {scrolledToBottom && <div ref={topElementRef} style={{ height: '10px' }}></div>}

      <MessagesList messages={messages} style={{ flex: '1 1 auto' }} />

      <div ref={bottomElementRef}></div>
    </Flex>
  );
};
