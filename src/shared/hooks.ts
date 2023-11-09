import { useCallback, useMemo, useState } from "react";

export type UseToggleResponse = {
  value: boolean;
  isTrue: boolean;
  isFalse: boolean;
  setTrue(): void;
  setFalse(): void;
  setValue(value: boolean): void;
};

export function useToggle(): UseToggleResponse {
  const [value, setValue] = useState(false);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return useMemo(
    () => ({
      value,
      setValue,
      setTrue,
      setFalse,
      isTrue: value === true,
      isFalse: value === false,
    }),
    [setFalse, setTrue, value]
  );
}
