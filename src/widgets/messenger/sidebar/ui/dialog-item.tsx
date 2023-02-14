import cn from "classnames";

import dayjs from "shared/lib/dayjs";
import { ReadStatusIcon } from "shared/components/read-status-icon";
import { Avatar } from "shared/components/avatar";

import classes from "./dialog-item.module.scss";
import { DialogModel } from "../types";
export interface DialogItemProps {
  isSelected?: boolean;
  onSelect: (item: DialogModel) => void;
  dialog: DialogModel;
}

export const DialogItem = (props: DialogItemProps) => {
  const isMyMessage =
    props.dialog.user.id !== props.dialog.lastMessage.senderId;

  let status: JSX.Element | null = null;

  if (isMyMessage) {
    status = <ReadStatusIcon isRead={props.dialog.lastMessage.isRead} />;
  } else if (props.dialog.notReadMessages > 0) {
    status = (
      <span className={classes.count}>
        {props.dialog.notReadMessages > 99
          ? "99+"
          : props.dialog.notReadMessages}
      </span>
    );
  }

  const onClick = () => {
    props.onSelect(props.dialog);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      props.onSelect(props.dialog);
    }
  };

  const className = cn(classes.root, {
    [classes.isSelected]: props.isSelected,
  });

  return (
    <div
      className={className}
      tabIndex={1}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      <div className={classes.avatarWrapper}>
        <Avatar
          className={classes.avatar}
          url={props.dialog.user.avatar}
          name={props.dialog.user.name}
          isOnline={props.dialog.user.isOnline}
        />
      </div>

      <div className={classes.body}>
        <div className={classes.line1}>
          <h6 className={classes.name}>{props.dialog.user.name}</h6>
          <time
            className={classes.time}
            dateTime={props.dialog.lastMessage.time}
          >
            {dayjs(props.dialog.lastMessage.time).fromNow()}
          </time>
        </div>

        <div className={classes.line2}>
          <p className={classes.text}>{props.dialog.lastMessage.text}</p>

          <div className={classes.status}>{status}</div>
        </div>
      </div>
    </div>
  );
};
