import cn from "classnames";

import ReadSvg from "@/shared/img/readed.svg?react";
import NotReadSvg from "@/shared/img/noreaded.svg?react";

import classes from "./read-status.module.scss";

export interface ReadStatusIconProps {
  isRead: boolean;
  className?: string;
}


export const ReadStatusIcon = (props: ReadStatusIconProps) => {
  const className = cn(props.className, classes.icon);

  return props.isRead ? <ReadSvg className={className} /> : <NotReadSvg className={className} />;
};
