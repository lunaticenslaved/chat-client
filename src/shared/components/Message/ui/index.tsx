import cn from "classnames";

import dayjs from "shared/lib/dayjs";
import { ReactComponent as ReadSvg } from "shared/img/readed.svg";
import { ReactComponent as NotReadSvg } from "shared/img/noreaded.svg";

import { MessageModel } from "../types";
import classes from "./Message.module.scss";

export type MessageProps = {
  message: MessageModel;
  isMe: boolean;
  isRead: boolean;
};

export const Message = (props: MessageProps) => {
  const { message } = props;

  let icon: JSX.Element | null = null;
  let attachments: JSX.Element | null = null;

  if (props.isMe) {
    icon = props.isRead ? <ReadSvg /> : <NotReadSvg />;
  }

  if (props.message.attachments.length) {
    attachments = (
      <>
        {props.message.attachments.map((att) => (
          <div key={att.id} className={classes.attachmentItem}>
            <img src={att.url} alt={att.filename} />
          </div>
        ))}
      </>
    );
  }

  return (
    <div className={cn(classes.root, { [classes.isMe]: props.isMe })}>
      <div className={classes.avatar}>
        <img src={message.avatarUrl} alt={"Аватар " + message.userName} />
      </div>
      <div>
        <div className={classes.content}>
          <div className={classes.bubble}>
            <p>{message.text}</p>
          </div>
          {icon && <div className={classes.readStatus}>{icon}</div>}
        </div>

        {attachments && (
          <div className={classes.attachments}>{attachments}</div>
        )}

        <time dateTime={message.createdAt} className={classes.date}>
          {dayjs(message.createdAt).fromNow()}
        </time>
      </div>
    </div>
  );
};
