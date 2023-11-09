import { message } from "antd";
import { InfoCircleTwoTone } from "@ant-design/icons";

import { useToggle } from "@/shared/hooks";
import { RepeatConfirmEmailButton } from "@/features/auth/repeat-confirm-email";
import { AuthLayout, Description } from "@/pages/_layouts/auth-layout";

import classes from "./index.module.scss";
import { useCallback } from "react";

export const ConfirmRequiredPage = () => {
  const isEmailSent = useToggle();
  const showError = useCallback(() => {
    message.error("Что-то пошло не так при повторной отправке письма");
  }, []);

  return (
    <AuthLayout header="Подтвердите e-mail" description="Пожалуйста, подтвердите свой e-mail адрес">
      <div className={classes.root}>
        <InfoCircleTwoTone className={classes.icon} />
        <h3 className={classes.header}>Подтвердите свой аккаунт</h3>
        <Description className={classes.description}>
          На Вашу почту было отправлено письмо с ссылкой на подтверждение аккаунта
        </Description>

        {isEmailSent.isTrue ? (
          <Description className={classes.description}>Письмо было отправлено повторно</Description>
        ) : (
          <RepeatConfirmEmailButton onSuccess={isEmailSent.setTrue} onError={showError} />
        )}
      </div>
    </AuthLayout>
  );
};

export default ConfirmRequiredPage;
