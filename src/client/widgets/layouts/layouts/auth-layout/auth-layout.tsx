import { ReactNode } from 'react';

import cn from 'classnames';

import { Block } from '#/client/shared/components/Block';

import classes from './auth-layout.module.scss';

interface AuthLayoutProps {
  header: string;
  description: string;
  children: ReactNode;
}

export function AuthLayout({ header, description, children }: AuthLayoutProps) {
  return (
    <section className={classes.page}>
      <div className={classes.top}>
        <h2 className={classes.header}>{header}</h2>
        <p className={cn(classes.description)}>{description}</p>
      </div>

      <Block className={classes.block}>{children}</Block>
    </section>
  );
}
