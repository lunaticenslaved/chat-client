import { createRef, useEffect } from 'react';

import { Message, MessageModel } from '@/entities/message';
import { useViewer } from '@/entities/viewer';

import classes from './messages-list.module.scss';

export interface MessagesListProps {
  messages: MessageModel[];
}

export const MessagesList = (props: MessagesListProps) => {
  const { viewer } = useViewer();
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
            <Message
              {...m}
              avatarSrc={m.author.avatar}
              ownerName={m.author.name}
              isMe={m.author.id === viewer?.id}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
