import { CSSProperties, createRef, useEffect } from 'react';

import { List } from 'antd';

import { useViewer } from '#/client/entities/viewer';
import { Message } from '#/domain/message';

import { MessageListItem } from '../list-item';

import classes from './list.module.scss';

export type MessagesListProps = {
  messages: Message[];
  style?: CSSProperties;
};

export const MessagesList = ({ messages, style }: MessagesListProps) => {
  const { user: viewer } = useViewer();
  const wrapperRef = createRef<HTMLDivElement>();

  useEffect(() => {
    wrapperRef.current?.scrollTo({
      top: Number.MAX_SAFE_INTEGER,
      behavior: 'auto',
    });
  }, [wrapperRef]);

  return (
    <div className={classes.root} ref={wrapperRef} style={style}>
      <List className={classes.list}>
        {messages.map(message => (
          <MessageListItem
            {...message}
            key={message.id}
            avatarSrc={message.author.avatar?.link}
            ownerName={message.author.login}
            isMe={message.author.id === viewer?.id}
          />
        ))}
      </List>
    </div>
  );
};
