import { useCallback, useEffect, useMemo, useState } from 'react';

export type UseToggleRequest = {
  value?: boolean;
};

export type UseToggleResponse = {
  value: boolean;
  isTrue: boolean;
  isFalse: boolean;
  setTrue(): void;
  setFalse(): void;
  setValue(value: boolean): void;
};

export function useToggle(props: UseToggleRequest = {}): UseToggleResponse {
  const [value, setValue] = useState(!!props.value);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  useEffect(() => {
    setValue(!!props.value);
  }, [props?.value]);

  return useMemo(
    () => ({
      value,
      setValue,
      setTrue,
      setFalse,
      isTrue: value === true,
      isFalse: value === false,
    }),
    [setFalse, setTrue, value],
  );
}
