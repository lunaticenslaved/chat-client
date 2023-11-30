import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { Form, FormInstance } from 'antd';

import { Button } from '@/shared/components/Button';

import classes from './auth-form.module.scss';

export type AuthFormProps<T> = {
  formInstance?: FormInstance<T>;
  buttonText: string;
  linkText: string;
  link: string;
  isSubmitting: boolean;
  children: ReactNode;
  onSubmit: (values: T) => Promise<void> | void;
};

export function AuthForm<T>(props: AuthFormProps<T>) {
  const { formInstance, buttonText, linkText, link, onSubmit, isSubmitting, children } = props;

  return (
    <Form form={formInstance} onFinish={onSubmit} disabled={isSubmitting}>
      {children}

      <Form.Item className={classes.buttonWrapper}>
        <Button size="large" htmlType="submit" className={classes.button} loading={isSubmitting}>
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
}
