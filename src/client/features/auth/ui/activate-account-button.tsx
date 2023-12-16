import { Button } from '#/client/shared/components/Button';

import { useActivateAccount } from '../hooks/activate-account';

export type ActivateAccountButtonProps = {
  onSuccess(): void;
};

export function ActivateAccountButton({ onSuccess }: ActivateAccountButtonProps) {
  const activation = useActivateAccount({ onSuccess });

  return (
    <Button
      htmlType="submit"
      type="primary"
      disabled={activation.isLoading}
      loading={activation.isLoading}>
      Submit
    </Button>
  );
}
