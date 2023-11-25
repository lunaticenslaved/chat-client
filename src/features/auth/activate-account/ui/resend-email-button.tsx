import { useCallback } from 'react';

import { useRepeatConfirmEmail } from '..';
import { message } from 'antd';

import { Button } from '@/shared/components/Button';
import { useToggle } from '@/shared/hooks';
import { Handlers } from '@/shared/types';

export interface ResendEmailButtonProps extends Handlers {}

export function ResendEmailButton(props: ResendEmailButtonProps) {
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
    <Button disabled={isLoading} loading={isLoading} onClick={repeatEmail}>
      Отправить снова
    </Button>
  );
}
