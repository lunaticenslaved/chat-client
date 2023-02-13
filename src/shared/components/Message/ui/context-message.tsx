import { PropsWithChildren } from "react";
import cn from "classnames";

import dayjs from "shared/lib/dayjs";
import { ReadStatusIcon } from "shared/components/read-status-icon";
import { Avatar } from "shared/components/avatar";

import classes from "./Message.module.scss";
import { AttachmentModel } from "../types";

export interface ContentMessageProps extends PropsWithChildren {
  avatarUrl: string;
  userName: string;
  createdAt: string;
  isMe: boolean;
  isRead: boolean;
  attachments: AttachmentModel[];
}

const getStatus = ({ isRead, isMe }: { isRead: boolean; isMe: boolean }) =>
  isMe ? <ReadStatusIcon isRead={isRead} /> : null;

export const ContentMessage = (props: ContentMessageProps) => {
  const status = getStatus(props);

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
    <div className={rootClassName}>
      <>
        <Avatar
          className={classes.avatar}
          url={props.avatarUrl}
          name={props.userName}
        />
        <div>
          <div className={classes.content}>
            {props.children}
            {status && <div className={classes.readStatus}>{status}</div>}
          </div>

          {attachments && (
            <div className={classes.attachments}>{attachments}</div>
          )}

          <time dateTime={props.createdAt} className={classes.date}>
            {dayjs(props.createdAt).fromNow()}
          </time>
        </div>
      </>
    </div>
  );
};
