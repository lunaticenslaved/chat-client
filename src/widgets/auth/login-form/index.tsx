import React from "react";
import { Form as AntForm, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import { Input } from "shared/components/input";
import { useAppDispatch } from "shared/hooks";
import { viewerService } from "features/viewer/service";

import { Form } from "../_lib/form";
import { viewerActions } from "features/viewer/store";

// FIXME: обработать ошибку "неверный пароль"

interface Values {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const dispatch = useAppDispatch();

  const onSubmit = (values: Values) => {
    return viewerService.login({
      data: values,
      onSuccess: (authResponse) =>
        dispatch(viewerActions.setAuthorized(authResponse)),
      onError: () => message.error("Что-то пошло не так при регистрации"),
    });
  };

  return (
    <>
      <Form<Values>
        buttonText="Войти в аккаунт"
        linkText="Зарегистрироваться"
        link="/register"
        onSubmit={onSubmit}
      >
        <AntForm.Item
          name="email"
          rules={[{ required: true, message: "Укажите e-mail пользователя" }]}
          hasFeedback
        >
          <Input prefix={<UserOutlined />} placeholder="E-mail" />
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
