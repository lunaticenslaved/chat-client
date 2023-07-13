import { PropsWithChildren, useMemo } from "react";
import cn from "classnames";
import { Form, FormInstance } from "antd";
import { Link } from "react-router-dom";

import { Block } from "shared/components/Block";
import { Button } from "shared/components/Button";

import classes from "./auth-layout.module.scss";

interface FormLayoutProps<T> extends PropsWithChildren {
  header: string;
  description: string;
  formInstance?: FormInstance<T>;
  buttonText: string;
  linkText: string;
  link: string;
  onSubmit: (values: T) => Promise<void> | void;
  isSubmitting: boolean;
}

interface LayoutProps extends PropsWithChildren {
  header: string;
  description: string;
}

type AuthLayoutProps<T> = LayoutProps | FormLayoutProps<T>;

export function AuthLayout<T>({
  header,
  description,
  children,
  ...otherProps
}: AuthLayoutProps<T>) {
  const content = useMemo(() => {
    if ("formInstance" in otherProps) {
      const { formInstance, buttonText, linkText, link, onSubmit, isSubmitting } = otherProps;

      return (
        <Form form={formInstance} onFinish={onSubmit} disabled={isSubmitting}>
          {children}

          <Form.Item className={classes.buttonWrapper}>
            <Button
              size="large"
              htmlType="submit"
              className={classes.button}
              loading={isSubmitting}
            >
              {buttonText}
            </Button>
          </Form.Item>

          <Form.Item>
            <Link to={link} className={classes.registerLink}>
              {linkText}
            </Link>
          </Form.Item>
        </Form>
      );
    } else {
      return children;
    }
  }, [children, otherProps]);

  return (
    <section className={classes.page}>
      <div className={classes.top}>
        <h2 className={classes.header}>{header}</h2>
        <p className={cn(classes.description)}>{description}</p>
      </div>

      <Block className={classes.block}>{content}</Block>
    </section>
  );
}

interface DescriptionProps extends PropsWithChildren {
  className?: string;
}

export const Description = (props: DescriptionProps) => (
  <p className={cn(classes.description, props.className)}>{props.children}</p>
);
