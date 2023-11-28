import { useViewer } from '@/entities/viewer';
import { LogoutButton } from '@/features/auth/logout';
import { Avatar } from '@/shared/components/avatar';
import { Divider } from '@/shared/components/divider';

import classes from './chat-layout.module.scss';

export interface ChatLayoutProps {
  sidebar: JSX.Element;
  content: JSX.Element;
}

export const ChatLayout = ({ content, sidebar }: ChatLayoutProps) => {
  const viewer = useViewer();

  if (!viewer.user) return;

  return (
    <div className={classes.root}>
      <nav className={classes.nav}>
        <Avatar name={viewer.user.login} url={viewer.user.avatar?.link} />
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
