import classes from "./chat-layout.module.scss";

import { Divider } from "shared/components/divider";

export interface ChatLayoutProps {
  sidebar: JSX.Element;
  chat: JSX.Element;
}

export const ChatLayout = ({ chat, sidebar }: ChatLayoutProps) => {
  return (
    <div>
      <div className={classes.root}>
        {sidebar}

        <Divider vertical />

        <div className={classes.chat}>{chat}</div>
      </div>
    </div>
  );
};
