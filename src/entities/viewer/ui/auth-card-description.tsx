import { PropsWithChildren } from "react";
import { Typography } from "antd";

export const Description = ({ children }: PropsWithChildren) => {
  return <Typography.Paragraph style={{ textAlign: "center" }}>{children}</Typography.Paragraph>;
};
