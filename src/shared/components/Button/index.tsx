import AntButton from "antd/lib/button";
import type { ButtonProps as AntButtonProps } from "antd/lib/button";
import cn from "classnames";

import "./index.scss";

type ButtonProps = Omit<AntButtonProps, "type">;

export const Button = (props: ButtonProps) => {
  return (
    <AntButton
      {...props}
      type="primary"
      className={cn("button", props.className)}
    >
      {props.children}
    </AntButton>
  );
};
