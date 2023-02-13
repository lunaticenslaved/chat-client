import { Form as AntForm } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import { Input } from "shared/components/input";

import { Form } from "../_lib/form";

interface Values {
  name: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: () => void;
}

export const LoginForm = (props: LoginFormProps) => {
  const onFinish = (values: Values) => {
    props.onSubmit();
    console.log("Received values of form: ", values);
  };

  return (
    <>
      <Form<Values>
        buttonText="Войти в аккаунт"
        linkText="Зарегистрироваться"
        link="/register"
        onFinish={onFinish}
      >
        <AntForm.Item
          name="username"
          rules={[{ required: true, message: "Укажите имя пользователя" }]}
          hasFeedback
        >
          <Input prefix={<UserOutlined />} placeholder="Логин" />
        </AntForm.Item>
        <AntForm.Item
          name="password"
          rules={[{ required: true, message: "Введите пароль" }]}
          hasFeedback
        >
          <Input
            autoComplete=""
            prefix={<LockOutlined />}
            type="password"
            placeholder="Пароль"
          />
        </AntForm.Item>
      </Form>
    </>
  );
};
