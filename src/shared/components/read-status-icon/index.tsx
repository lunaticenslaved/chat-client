import cn from "classnames";

import { ReactComponent as ReadSvg } from "shared/img/readed.svg";
import { ReactComponent as NotReadSvg } from "shared/img/noreaded.svg";

import classes from "./read-status.module.scss";

export interface ReadStatusIconProps {
  isRead: boolean;
  className?: string;
}

export const ReadStatusIcon = (props: ReadStatusIconProps) => {
  const className = cn(props.className, classes.icon);

  return props.isRead ? <ReadSvg className={className} /> : <NotReadSvg className={className} />;
};
