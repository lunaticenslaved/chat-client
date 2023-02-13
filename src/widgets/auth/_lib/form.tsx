import { PropsWithChildren } from "react";
import { Form as AntForm, FormInstance } from "antd";
import { Link } from "react-router-dom";

import { Button } from "shared/components/button";

import classes from "./form.module.scss";

interface FormProps<T> extends PropsWithChildren {
  onFinish: (values: T) => void;
  formInstance?: FormInstance<T>;
  buttonText: string;
  linkText: string;
  link: string;
}

export const Form = <T,>(props: FormProps<T>) => {
  return (
    <>
      <AntForm form={props.formInstance} onFinish={props.onFinish}>
        {props.children}

        <AntForm.Item className={classes.buttonWrapper}>
          <Button size="large" htmlType="submit" className={classes.button}>
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
