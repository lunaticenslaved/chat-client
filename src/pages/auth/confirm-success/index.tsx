import React from "react";
import { Spin } from "antd";
import { Link, useParams } from "react-router-dom";
import { CheckCircleTwoTone } from "@ant-design/icons";

import { $api } from "shared/api";
import { Button } from "shared/components/Button";

import { AuthLayout } from "pages/_layouts/auth-layout";

import classes from "./index.module.scss";

const ConfirmSuccessPage = () => {
  const { link } = useParams();
  const [isSubmitting, setSubmitting] = React.useState(false);
  const [errored, setErrored] = React.useState(false);

  const activate = () => {
    setSubmitting(true);

    $api
      .post("/activate/" + link)
      .catch(() => setErrored(true))
      .finally(() => setSubmitting(false));
  };

  React.useEffect(() => {
    activate();
  }, []);

  if (isSubmitting) {
    return (
      <AuthLayout
        header="Подтверждение аккаунта"
        description="Пожалуйста, подождите"
      >
        <div className={classes.root}>
          <Spin tip="Подтверждение аккаунта" size="large" />
        </div>
      </AuthLayout>
    );
  }

  if (errored) {
    return (
      <AuthLayout
        header="Ошибка"
        description="Что-то пошло не так при подтверждении аккаунта"
      >
        <div className={classes.root}>
          <Button onClick={activate}>Попробовать снова</Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      header="E-mail адрес подтвержден"
      description="Теперь вы можете начать общаться"
    >
      <div className={classes.root}>
        <CheckCircleTwoTone className={classes.icon} />
        <Link to="/login">Перейти к авторизации</Link>
      </div>
    </AuthLayout>
  );
};

export default ConfirmSuccessPage;
