import cn from "classnames";

import classes from "./online-status.module.scss";

export interface OnlineStatusProps {
  isOnline: boolean;
}

export const OnlineStatus = (props: OnlineStatusProps) => {
  return <span className={cn({ [classes.online]: props.isOnline })}></span>;
};
