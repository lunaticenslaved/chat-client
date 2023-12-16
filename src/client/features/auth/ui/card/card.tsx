import { ReactNode } from 'react';

import cn from 'classnames';

import { Block } from '#/client/shared/components/Block';

import classes from './card.module.scss';

interface AuthCardProps {
  header: string;
  description: string;
  children: ReactNode;
}

export function AuthCard({ header, description, children }: AuthCardProps) {
  return (
    <>
      <div className={classes.top}>
        <h2 className={classes.header}>{header}</h2>
        <p className={cn(classes.description)}>{description}</p>
      </div>

      <Block className={classes.block}>{children}</Block>
    </>
  );
}
