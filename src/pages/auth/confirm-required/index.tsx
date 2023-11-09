import { useCallback } from "react";
import { message } from "antd";
import { InfoCircleTwoTone } from "@ant-design/icons";

import { useToggle } from "@/shared/hooks";
import { RepeatConfirmEmailButton } from "@/features/auth/repeat-confirm-email";
import { Layout } from "@/widgets/layouts";
import { AuthFormDescription } from "@/entities/viewer";

import classes from "./index.module.scss";

export const ConfirmRequiredPage = () => {
  const isEmailSent = useToggle();
  const showError = useCallback(() => {
    message.error("Что-то пошло не так при повторной отправке письма");
  }, []);

  return (
    <Layout.Auth
      header="Подтвердите e-mail"
      description="Пожалуйста, подтвердите свой e-mail адрес"
    >
      <div className={classes.root}>
        <InfoCircleTwoTone className={classes.icon} />
        <h3 className={classes.header}>Подтвердите свой аккаунт</h3>
        <AuthFormDescription className={classes.description}>
          На Вашу почту было отправлено письмо с ссылкой на подтверждение аккаунта
        </AuthFormDescription>

        {isEmailSent.isTrue ? (
          <AuthFormDescription className={classes.description}>
            Письмо было отправлено повторно
          </AuthFormDescription>
        ) : (
          <RepeatConfirmEmailButton onSuccess={isEmailSent.setTrue} onError={showError} />
        )}
      </div>
    </Layout.Auth>
  );
};

export default ConfirmRequiredPage;
