import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { InfoCircleTwoTone } from '@ant-design/icons';
import { Button, Flex, Form, Input, Result } from 'antd';

import schema from '@lunaticenslaved/schema';

import { ROUTES } from '#/client/config/routes';
import { ResendEmailButton, useActivateAccount } from '#/client/features/auth';
import { useToggle } from '#/client/shared/hooks';
import { createAntdValidator } from '#/client/shared/lib/validators';
import { Layout } from '#/client/widgets/layouts';

import classes from './index.module.scss';

interface Values {
  activationToken: string;
}

export const ConfirmRequiredPage = () => {
  const [form] = Form.useForm<Values>();
  const success = useToggle();
  const navigate = useNavigate();

  const showSuccess = useCallback(() => {
    success.setTrue();

    // TODO it's better to show an animation while waiting
    setTimeout(() => {
      navigate(ROUTES.auth.signIn);
    }, 3000);
  }, [navigate, success]);

  const activation = useActivateAccount({
    onSuccess: showSuccess,
  });

  return (
    <Layout.Auth
      header="Подтвердите e-mail"
      description="Пожалуйста, подтвердите свой e-mail адрес">
      <section className={classes.root}>
        {success.isTrue ? (
          <Result status="success" title="E-mail подтвержден" />
        ) : (
          <>
            <InfoCircleTwoTone className={classes.icon} />
            <h3 className={classes.header}>Подтвердите свой аккаунт</h3>
            <p className={classes.text}>
              Введите код, который Вы получили на почту, указанную при регистрации
            </p>

            <Form
              className={classes.form}
              form={form}
              disabled={activation.isLoading}
              onFinish={activation.call}>
              <Form.Item
                name="activationToken"
                rules={[
                  {
                    validator: createAntdValidator(schema.Validators.required('Code is required')),
                  },
                ]}
                hasFeedback>
                <Input placeholder="Code" width="100%" />
              </Form.Item>

              <Flex gap="small" justify="center">
                <Form.Item className={classes.buttonWrapper}>
                  <Button
                    htmlType="submit"
                    type="primary"
                    disabled={activation.isLoading}
                    loading={activation.isLoading}>
                    Submit
                  </Button>
                </Form.Item>

                <ResendEmailButton type="dashed" />
              </Flex>
            </Form>
          </>
        )}
      </section>
    </Layout.Auth>
  );
};

export default ConfirmRequiredPage;
