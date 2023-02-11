import cn from "classnames";

import classes from "./avatar.module.scss";

export interface AvatarProps {
  alt: string;
  url: string;
  isOnline?: boolean;
  className?: string;
}

export const Avatar = (props: AvatarProps) => {
  return (
    <div className={cn(classes.root, props.className)}>
      <img src={props.url} alt={props.alt} />

      <span className={cn({ [classes.online]: props.isOnline })}></span>
    </div>
  );
};
