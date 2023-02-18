import { PropsWithChildren } from "react";
import cn from "classnames";

import dayjs from "shared/lib/dayjs";
import { ReadStatusIcon } from "shared/components/read-status-icon";
import { Avatar } from "shared/components/avatar";
import { MessageModel, AttachmentModel } from "features/messages/store";

import classes from "./message.module.scss";

export interface MessageWrapperProps extends PropsWithChildren {
  message: MessageModel;
  isMe: boolean;
  attachments: AttachmentModel[];
}

const getStatus = ({ isRead, isMe }: { isRead: boolean; isMe: boolean }) =>
  isMe ? <ReadStatusIcon isRead={isRead} /> : null;

export const MessageWrapper = (props: MessageWrapperProps) => {
  const status = getStatus({
    isMe: props.isMe,
    isRead: props.message.isRead,
  });

  let attachments: JSX.Element | null = null;
  if (props.attachments.length) {
    attachments = (
      <>
        {props.attachments.map((att) => (
          <div key={att.id} className={classes.attachmentItem}>
            <img src={att.url} alt={att.filename} />
          </div>
        ))}
      </>
    );
  }

  const rootClassName = cn(classes.root, {
    [classes.isMe]: props.isMe,
  });

  return (
    <li className={rootClassName}>
      <>
        <Avatar
          className={classes.avatar}
          url={props.message.author.avatar}
          name={props.message.author.name}
        />
        <div>
          <div className={classes.content}>
            {props.children}
            {status && <div className={classes.readStatus}>{status}</div>}
          </div>

          {attachments && (
            <div className={classes.attachments}>{attachments}</div>
          )}

          <time dateTime={props.message.createdAt} className={classes.date}>
            {dayjs(props.message.createdAt).fromNow()}
          </time>
        </div>
      </>
    </li>
  );
};
