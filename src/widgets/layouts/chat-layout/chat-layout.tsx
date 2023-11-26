import { Divider } from '@/shared/components/divider';

import classes from './chat-layout.module.scss';

export interface ChatLayoutProps {
  sidebar: JSX.Element;
  content: JSX.Element;
}

export const ChatLayout = ({ content, sidebar }: ChatLayoutProps) => {
  return (
    <main className={classes.root}>
      {sidebar}

      <Divider vertical />

      <div className={classes.content}>{content}</div>
    </main>
  );
};
