import { InfoCircleTwoTone } from '@ant-design/icons';

import { AuthFormDescription } from '@/entities/viewer';
import { ResendEmailButton } from '@/features/auth/activate-account';
import { Layout } from '@/widgets/layouts';

import classes from './index.module.scss';

export const ConfirmRequiredPage = () => {
  return (
    <Layout.Auth
      header="Подтвердите e-mail"
      description="Пожалуйста, подтвердите свой e-mail адрес">
      <div className={classes.root}>
        <InfoCircleTwoTone className={classes.icon} />
        <h3 className={classes.header}>Подтвердите свой аккаунт</h3>
        <AuthFormDescription className={classes.description}>
          На Вашу почту было отправлено письмо с ссылкой на подтверждение
          аккаунта
        </AuthFormDescription>

        <ResendEmailButton />
      </div>
    </Layout.Auth>
  );
};

export default ConfirmRequiredPage;
