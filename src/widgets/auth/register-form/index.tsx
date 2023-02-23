import { Form as AntForm, FormRule, message } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { Input } from "shared/components/input";
import {
  validateEmail,
  validatePassword,
  validateLogin,
} from "shared/lib/validators";
import { useAppDispatch } from "shared/hooks";
import { viewerService } from "features/viewer/service";
import { viewerActions } from "features/viewer/store";

import { Form } from "../_lib/form";

export interface Values {
  email: string;
  name: string;
  password: string;
}

export const RegisterForm = () => {
  const [formInstance] = AntForm.useForm<Values>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = (values: Values) => {
    return viewerService.register({
      data: values,
      onSuccess: (authResponse) => {
        dispatch(viewerActions.setAuthorized(authResponse));
        navigate("/confirm-email", { replace: true });
      },
      onError: () => message.error("Что-то пошло не так при регистрации"),
    });
  };

  const loginRule: FormRule = {
    validator: (_, value) => {
      if (!value) {
        return Promise.reject("Введите логин");
      }

      const check = validateLogin(value);

      if (check.error) {
        return Promise.reject(check.error);
      }

      return Promise.resolve();
    },
  };
  const emailRule: FormRule = {
    validator: (_, value) => {
      if (!value) {
        return Promise.reject("Введите e-mail");
      }

      const check = validateEmail(value);

      if (check.error) {
        return Promise.reject(check.error);
      }

      return Promise.resolve();
    },
  };
  const passwordRule = (fieldName: string): FormRule => ({
    validator: (_, value) => {
      if (!value) {
        return Promise.reject("Введите пароль");
      }

      if (fieldName === "password") {
        const check = validatePassword(value);

        if (check.error) {
          return Promise.reject(check.error);
        }
      }

      if (fieldName === "passwordRepeat") {
        const password = formInstance.getFieldValue("password");
        if (password !== value) {
          return Promise.reject("Пароли не совпадают");
        }
      }

      return Promise.resolve();
    },
  });

  return (
    <>
      <Form<Values>
        formInstance={formInstance}
        buttonText="Зарегистрироваться"
        linkText="Войти в аккаунт"
        link="/login"
        onSubmit={onSubmit}
      >
        <AntForm.Item name="email" rules={[emailRule]} hasFeedback>
          <Input prefix={<MailOutlined />} placeholder="E-mail" />
        </AntForm.Item>

        <AntForm.Item name="name" rules={[loginRule]} hasFeedback>
          <Input prefix={<UserOutlined />} placeholder="Логин" />
        </AntForm.Item>

        <AntForm.Item
          name="password"
          rules={[passwordRule("password")]}
          hasFeedback
        >
          <Input
            autoComplete=""
            prefix={<LockOutlined />}
            type="password"
            placeholder="Пароль"
          />
        </AntForm.Item>

        <AntForm.Item
          name="passwordRepeat"
          rules={[passwordRule("passwordRepeat")]}
          hasFeedback
        >
          <Input
            autoComplete=""
            prefix={<LockOutlined />}
            type="password"
            placeholder="Повторите пароль"
          />
        </AntForm.Item>
      </Form>
    </>
  );
};
