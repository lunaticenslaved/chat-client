import React from "react";

import { PropsWithChildren } from "react";
import { Form as AntForm, FormInstance } from "antd";
import { Link } from "react-router-dom";

import { Button } from "shared/components/button";

import classes from "./form.module.scss";

interface FormProps<T> extends PropsWithChildren {
  onSubmit: (values: T) => Promise<void> | void;
  formInstance?: FormInstance<T>;
  buttonText: string;
  linkText: string;
  link: string;
}

export const Form = <T,>(props: FormProps<T>) => {
  const [isSubmitting, setSubmitting] = React.useState(false);

  const onFinish = async (values: T) => {
    setSubmitting(true);
    await props.onSubmit(values);
    setSubmitting(false);
  };

  return (
    <>
      <AntForm
        form={props.formInstance}
        onFinish={onFinish}
        disabled={isSubmitting}
      >
        {props.children}

        <AntForm.Item className={classes.buttonWrapper}>
          <Button
            size="large"
            htmlType="submit"
            className={classes.button}
            loading={isSubmitting}
          >
            {props.buttonText}
          </Button>
        </AntForm.Item>

        <AntForm.Item>
          <Link to={props.link} className={classes.registerLink}>
            {props.linkText}
          </Link>
        </AntForm.Item>
      </AntForm>
    </>
  );
};
