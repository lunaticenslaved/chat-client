import { PropsWithChildren } from "react";
import cn from "classnames";

import classes from "./Block.module.scss";
import { SizeType } from "@/shared/types";

interface BlockProps extends PropsWithChildren {
  className?: string;
  size?: SizeType;
}

export const Block = (props: BlockProps) => {
  const className = cn("block", classes.root, props.className, {
    [classes.large]: props.size === "large",
    [classes.middle]: !props.size || props.size === "middle",
    [classes.small]: props.size === "small",
  });
  return <div className={className}>{props.children}</div>;
};
