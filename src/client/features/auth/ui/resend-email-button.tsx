import { useCallback } from 'react';

import { message } from 'antd';
import { ButtonProps } from 'antd/lib/button';

import { Button } from '#/client/shared/components/Button';
import { useToggle } from '#/client/shared/hooks';
import { Handlers } from '#/client/shared/types';

import { useRepeatConfirmEmail } from '../hooks/resend-email';

export interface ResendEmailButtonProps extends Handlers {
  type?: ButtonProps['type'];
}

export function ResendEmailButton({ type, ...props }: ResendEmailButtonProps) {
  const showingText = useToggle();
  const showError = useCallback(() => {
    message.error('Что-то пошло не так при повторной отправке письма');
  }, []);
  const { isLoading, repeatEmail } = useRepeatConfirmEmail({
    ...props,
    onSuccess() {
      showingText.setTrue();
      // TODO can display progress to indicate when button shows
      setTimeout(showingText.setFalse, 3000);
      showError();
      props.onSuccess?.();
    },
  });

  return showingText.isTrue ? (
    <p style={{ textAlign: 'center' }}>Письмо было отправлено повторно</p>
  ) : (
    <Button disabled={isLoading} loading={isLoading} onClick={repeatEmail} type={type}>
      Отправить снова
    </Button>
  );
}
