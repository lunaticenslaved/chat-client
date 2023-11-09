import { Button } from "@/shared/components/Button";
import { Handlers } from "@/shared/types";

import { useRepeatConfirmEmail } from "../hooks";

export type RepeatConfirmEmailButtonProps = Handlers;

export function RepeatConfirmEmailButton(props: RepeatConfirmEmailButtonProps) {
  const { isLoading, repeatEmail } = useRepeatConfirmEmail(props);

  return (
    <Button disabled={isLoading} loading={isLoading} onClick={repeatEmail}>
      Отправить снова
    </Button>
  );
}
