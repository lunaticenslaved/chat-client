import React from "react";

import { useAppSelector } from "shared/hooks";
import { MessageModel } from "features/messages/store/types";
import { viewerSelectors } from "features/viewer";

import { Message } from "./message";
import classes from "./messages-list.module.scss";

export interface MessagesListProps {
  messages: MessageModel[];
}

export const MessagesList = (props: MessagesListProps) => {
  const viewer = useAppSelector(viewerSelectors.selectViewer);
  const wrapperRef = React.createRef<HTMLDivElement>();

  React.useEffect(() => {
    wrapperRef.current?.scrollTo({
      top: Number.MAX_SAFE_INTEGER,
      behavior: "auto",
    });
  }, []);

  return (
    <div className={classes.root} ref={wrapperRef}>
      <ul>
        {props.messages.map((m) => (
          <li key={m.id}>
            <Message message={m} isMe={m.author.id === viewer.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};
