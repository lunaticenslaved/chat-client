import classes from "./chat-layout.module.scss";

import { Divider } from "shared/components/divider";

export interface ChatLayoutProps {
  sidebar: JSX.Element;
  content: JSX.Element;
}

export const ChatLayout = ({ content, sidebar }: ChatLayoutProps) => {
  return (
    <div>
      <div className={classes.root}>
        {sidebar}

        <Divider vertical />

        <div className={classes.content}>{content}</div>
      </div>
    </div>
  );
};
