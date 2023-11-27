import { LogoutButton } from '@/features/auth/logout';
import { Divider } from '@/shared/components/divider';

import classes from './chat-layout.module.scss';

export interface ChatLayoutProps {
  sidebar: JSX.Element;
  content: JSX.Element;
}

export const ChatLayout = ({ content, sidebar }: ChatLayoutProps) => {
  return (
    <div className={classes.root}>
      <nav className={classes.nav}>
        <LogoutButton />
      </nav>

      <Divider vertical />

      <main className={classes.main}>
        {sidebar}

        <Divider vertical />

        <div className={classes.content}>{content}</div>
      </main>
    </div>
  );
};
