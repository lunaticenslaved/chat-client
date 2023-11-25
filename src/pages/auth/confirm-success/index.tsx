import { useCallback, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { CheckCircleTwoTone } from '@ant-design/icons';
import { Spin } from 'antd';

import { ROUTES } from '@/config/routes';
import { ResendEmailButton } from '@/features/auth/activate-account';
import { useActivateAccount } from '@/features/auth/activate-account/domain/use-activate-account';
import { Button } from '@/shared/components/Button';
import { useToggle } from '@/shared/hooks';
import { Layout } from '@/widgets/layouts';

import classes from './index.module.scss';

const ConfirmSuccessPage = () => {
  const { link } = useParams();
  const errorToggle = useToggle();
  const activateAccount = useActivateAccount({
    onError: errorToggle.setTrue,
  });

  const activate = useCallback(() => {
    if (link) {
      errorToggle.setFalse();
      activateAccount.call({ activationToken: link });
    }
  }, [activateAccount, errorToggle, link]);

  useEffect(() => {
    activate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (activateAccount.isLoading) {
    return (
      <Layout.Auth header="Подтверждение аккаунта" description="Пожалуйста, подождите">
        <div className={classes.root}>
          <Spin tip="Подтверждение аккаунта" size="large" />
        </div>
      </Layout.Auth>
    );
  }

  if (errorToggle.isTrue) {
    return (
      <Layout.Auth header="Ошибка" description="Что-то пошло не так при подтверждении аккаунта">
        <div className={classes.root}>
          <Button onClick={activate}>Попробовать снова</Button>
        </div>
        <ResendEmailButton />
      </Layout.Auth>
    );
  }

  return (
    <Layout.Auth header="E-mail адрес подтвержден" description="Теперь вы можете начать общаться">
      <div className={classes.root}>
        <CheckCircleTwoTone className={classes.icon} />
        <Link to={ROUTES.auth.signIn}>Перейти к авторизации</Link>
      </div>
    </Layout.Auth>
  );
};

export default ConfirmSuccessPage;
