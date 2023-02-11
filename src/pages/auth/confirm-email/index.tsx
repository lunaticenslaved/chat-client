import { InfoCircleTwoTone } from "@ant-design/icons";

import { Layout, Description } from "../_lib/layout";

import classes from "./index.module.scss";

export const ConfirmEmailPage = () => {
  return (
    <Layout
      header="Подтвердите e-mail"
      description="Пожалуйста, подтвердите свой e-mail адрес"
    >
      <div className={classes.root}>
        <InfoCircleTwoTone className={classes.icon} />
        <h3 className={classes.header}>Подтвердите свой аккаунт</h3>
        <Description className={classes.description}>
          На Вашу почту было отправлено письмо с ссылкой на подтверждение
          аккаунта
        </Description>
      </div>
    </Layout>
  );
};

export default ConfirmEmailPage;
