import {
  UIEventHandler,
  createRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { List } from 'antd';

import { MessageListItem, MessageMenu, MessagePlaceholderItem } from '#/client/entities/message';
import { useViewer } from '#/client/entities/viewer';
import { isMessagePlaceholder } from '#/client/features/messenger/types';
import { MessageItemInfo, UserOrContactAvatar } from '#/client/features/messenger/ui/common';
import { Flex } from '#/client/shared/components/flex';
import { useToggle } from '#/client/shared/hooks';
import { canDeleteMessage } from '#/domain/message';

import { useMessengerContext } from '../../../context';
import { FileDrop } from '../../file-drop';

export function MessagesList() {
  const {
    eventBus,
    messages,
    hasMoreMessages,
    fetchMoreMessages,
    deleteMessage,
    markMessageAsRead,
    isFetchingMoreMessages,
  } = useMessengerContext();
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const { user: viewer } = useViewer();

  const scrollArea = createRef<HTMLDivElement>();
  const bottomElementRef = createRef<HTMLDivElement>();
  const topElementRef = createRef<HTMLDivElement>();
  const scrollBottom = useRef(0);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

  const isReadIntersectionObserver = useMemo(() => {
    const io = new IntersectionObserver(
      function (entries) {
        for (const entry of entries) {
          if (entry.isIntersecting === true) {
            io.unobserve(entry.target);

            {
              const messageId = entry.target.getAttribute('data-message-id');

              if (!messageId) {
                throw new Error('Message id not provided');
              }

              markMessageAsRead(messageId);
            }

            if (entry.target.previousElementSibling) {
              const messageId = entry.target.previousElementSibling.getAttribute('data-message-id');

              if (messageId) {
                markMessageAsRead(messageId);
              }
            }
          }
        }
      },
      { threshold: [0], root: scrollArea.current },
    );

    return io;
  }, [markMessageAsRead, scrollArea]);

  useEffect(() => {
    if (!scrollArea.current) return;

    const elements = scrollArea.current.querySelectorAll('[data-is-read="false"]');

    for (const element of Array.from(elements)) {
      isReadIntersectionObserver.observe(element);
    }

    return () => {
      isReadIntersectionObserver.disconnect();
    };
  });

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

    if (!isFetchingMoreMessages) {
      const scrollTop = (scrollArea.current.scrollHeight ?? 0) - scrollBottom.current;
      scrollArea.current.scrollTo({ top: scrollTop, behavior: 'instant' });
      scrollArea.current.scrollTop = scrollTop;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchingMoreMessages]);

  const scrolledToFirstUnreadMessage = useToggle();

  useLayoutEffect(() => {
    if (!scrollArea.current) return;

    if (!scrolledToFirstUnreadMessage.value) {
      const element = scrollArea.current.querySelector('[data-is-read="false"]');

      if (element) {
        if (!scrolledToFirstUnreadMessage.value) {
          element.scrollIntoView({ behavior: 'instant', block: 'end' });
          scrolledToFirstUnreadMessage.setTrue();
          setScrolledToBottom(true);
        }

        return;
      }
    }

    if (bottomElementRef.current && !scrolledToBottom) {
      bottomElementRef.current.scrollIntoView({ behavior: 'instant', block: 'end' });
      setScrolledToBottom(true);
    }
  }, [bottomElementRef, scrollArea, scrolledToBottom, scrolledToFirstUnreadMessage]);

  const wrapperRef = createRef<HTMLDivElement>();

  useEffect(() => {
    wrapperRef.current?.scrollTo({
      top: Number.MAX_SAFE_INTEGER,
      behavior: 'auto',
    });
  }, [wrapperRef]);

  const onScroll: UIEventHandler<HTMLElement> = useCallback(event => {
    const element = event.currentTarget;

    scrollBottom.current = (element.scrollHeight ?? 0) - (element.scrollTop ?? 0);

    if (element) {
      const l1 = element.scrollTop;
      const l2 = element.scrollHeight - element.offsetHeight;
      setIsScrolledToBottom(Math.abs(l1 - l2) < 10);
    } else {
      setIsScrolledToBottom(false);
    }
  }, []);

  useEffect(() => {
    if (!scrollArea.current) return;

    if (isScrolledToBottom) {
      scrollArea.current.scrollTop = scrollArea.current.scrollHeight;
    }
  }, [isScrolledToBottom, scrollArea]);

  useEffect(() => {
    const scrollToBottom = () => {
      setIsScrolledToBottom(true);
    };

    eventBus.on('sent', scrollToBottom);

    return () => {
      eventBus.off('sent', scrollToBottom);
    };
  }, [eventBus, scrollArea, viewer?.id]);

  if (!viewer) {
    return null;
  }

  return (
    <FileDrop>
      <Flex
        direction="column"
        style={{ overflow: 'auto', flex: '1 1 auto' }}
        ref={scrollArea}
        onScroll={onScroll}>
        {scrolledToBottom && <div ref={topElementRef} style={{ height: '10px' }} />}

        <Flex
          direction="column"
          justifyContent="flex-end"
          ref={wrapperRef}
          style={{ flex: '1 1 auto' }}>
          <List>
            {messages.map(message => {
              if (isMessagePlaceholder(message)) {
                return (
                  <MessagePlaceholderItem
                    key={message.id}
                    message={message}
                    createdAt={message.createdAt}
                    avatar={() => <UserOrContactAvatar user={viewer} />}
                  />
                );
              }

              return (
                <MessageItemInfo key={message.id} message={message}>
                  {({ avatar, ownerName, isMe, isMyMessageRead, isReadByMe }) => (
                    <MessageMenu
                      message={message}
                      deleteMessage={
                        viewer &&
                        canDeleteMessage({ viewerId: viewer?.id, authorId: message.authorId })
                          ? deleteMessage
                          : undefined
                      }
                      placement={isMe ? 'right' : 'left'}>
                      <div data-message-id={message.id} data-is-read={isMe || isReadByMe}>
                        <MessageListItem
                          {...message}
                          avatar={avatar}
                          ownerName={ownerName}
                          isMe={isMe}
                          isRead={isMyMessageRead}
                        />
                      </div>
                    </MessageMenu>
                  )}
                </MessageItemInfo>
              );
            })}
          </List>
        </Flex>

        <div ref={bottomElementRef} />
      </Flex>
    </FileDrop>
  );
}
