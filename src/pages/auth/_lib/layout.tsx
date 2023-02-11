import { PropsWithChildren } from "react";
import cn from "classnames";

import { Block } from "shared/components/Block";

import classes from "./layout.module.scss";

interface LayoutProps extends PropsWithChildren {
  header: string;
  description: string;
}

export const Layout = (props: LayoutProps) => {
  return (
    <section className={classes.page}>
      <div className={classes.top}>
        <h2 className={classes.header}>{props.header}</h2>
        <Description>{props.description}</Description>
      </div>
      <Block className={classes.block}>{props.children}</Block>
    </section>
  );
};

interface DescriptionProps extends PropsWithChildren {
  className?: string;
}

export const Description = (props: DescriptionProps) => (
  <p className={cn(classes.description, props.className)}>{props.children}</p>
);
