import { Input as AntInput, type InputProps as AntInputProps } from "antd";
import cn from "classnames";

import "./index.scss";

type InputProps = Omit<AntInputProps, "size">;

export const Input = (props: InputProps) => {
  return (
    <AntInput
      {...props}
      type="primary"
      size="large"
      className={cn("input", props.className)}
    >
      {props.children}
    </AntInput>
  );
};
