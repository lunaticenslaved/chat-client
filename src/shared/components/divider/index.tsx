import { Divider as AntDivider } from "antd";
import cn from "classnames";

import classes from "./divider.module.scss";

interface DividerProps {
  vertical?: boolean;
}

export const Divider = (props: DividerProps) => {
  const className = cn(classes.line, {
    [classes.horizontal]: !props.vertical,
    [classes.vertical]: !!props.vertical,
  });

  return <AntDivider className={className} type={props.vertical ? "vertical" : "horizontal"} />;
};
