import React from "react";
import { message } from "antd";
import { InfoCircleTwoTone } from "@ant-design/icons";

import { Button } from "shared/components/Button";
import { useRepeatConfirmMail } from "features/auth/use-repeat-confirm-mail";
import { AuthLayout, Description } from "pages/_layouts/auth-layout";

import classes from "./index.module.scss";

export const ConfirmRequiredPage = () => {
  const [isSent, setSent] = React.useState(false);
  const { repeat: repeatConfirmMail, isLoading: isSubmitting } = useRepeatConfirmMail({
    onSuccess: () => setSent(true),
    onError: () => {
      message.error("Что-то пошло не так при повторной отправке письма");
    },
  });

  return (
    <AuthLayout header="Подтвердите e-mail" description="Пожалуйста, подтвердите свой e-mail адрес">
      <div className={classes.root}>
        <InfoCircleTwoTone className={classes.icon} />
        <h3 className={classes.header}>Подтвердите свой аккаунт</h3>
        <Description className={classes.description}>
          На Вашу почту было отправлено письмо с ссылкой на подтверждение аккаунта
        </Description>

        {isSent ? (
          <Description className={classes.description}>Письмо было отправлено повторно</Description>
        ) : (
          <Button disabled={isSubmitting} loading={isSubmitting} onClick={repeatConfirmMail}>
            Отправить снова
          </Button>
        )}
      </div>
    </AuthLayout>
  );
};

export default ConfirmRequiredPage;
