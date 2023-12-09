import { createRef, useEffect } from 'react';

import { MessageItem } from '#/client/entities/message';
import { useViewer } from '#/client/entities/viewer';
import { Message } from '#/domain/message';

import classes from './messages-list.module.scss';

export interface MessagesListProps {
  messages: Message[];
}

export const MessagesList = (props: MessagesListProps) => {
  const { user: viewer } = useViewer();
  const wrapperRef = createRef<HTMLDivElement>();

  useEffect(() => {
    wrapperRef.current?.scrollTo({
      top: Number.MAX_SAFE_INTEGER,
      behavior: 'auto',
    });
  }, [wrapperRef]);

  return (
    <div className={classes.root} ref={wrapperRef}>
      <ul>
        {props.messages.map(m => (
          <li key={m.id}>
            <MessageItem
              {...m}
              avatarSrc={m.author.avatar?.link}
              ownerName={m.author.login}
              isMe={m.author.id === viewer?.id}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
