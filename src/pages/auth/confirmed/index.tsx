import React from "react";
import { Spin } from "antd";
import { Link, useParams } from "react-router-dom";
import { CheckCircleTwoTone } from "@ant-design/icons";

import { $api } from "shared/api";
import { Button } from "shared/components/button";

import { Layout } from "../_lib/layout";

import classes from "./index.module.scss";

const ConfirmedPage = () => {
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
      <Layout
        header="Подтверждение аккаунта"
        description="Пожалуйста, подождите"
      >
        <div className={classes.root}>
          <Spin tip="Подтверждение аккаунта" size="large" />
        </div>
      </Layout>
    );
  }

  if (errored) {
    return (
      <Layout
        header="Ошибка"
        description="Что-то пошло не так при подтверждении аккаунта"
      >
        <div className={classes.root}>
          <Button onClick={activate}>Попробовать снова</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      header="E-mail адрес подтвержден"
      description="Теперь вы можете начать общаться"
    >
      <div className={classes.root}>
        <CheckCircleTwoTone className={classes.icon} />
        <Link to="/login">Перейти к авторизации</Link>
      </div>
    </Layout>
  );
};

export default ConfirmedPage;
