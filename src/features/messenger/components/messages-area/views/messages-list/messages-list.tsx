import { createRef, useEffect } from "react";

import { MessageModel } from "entities/message/store/types";
import { useViewer } from "features/auth/use-viewer";

import { Message } from "../../components/message";

import classes from "./messages-list.module.scss";

export interface MessagesListProps {
  messages: MessageModel[];
}

export const MessagesList = (props: MessagesListProps) => {
  const { viewer } = useViewer();
  const wrapperRef = createRef<HTMLDivElement>();

  useEffect(() => {
    wrapperRef.current?.scrollTo({
      top: Number.MAX_SAFE_INTEGER,
      behavior: "auto",
    });
  }, [wrapperRef]);

  return (
    <div className={classes.root} ref={wrapperRef}>
      <ul>
        {props.messages.map((m) => (
          <li key={m.id}>
            <Message message={m} isMe={m.author.id === viewer?.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};
