import { useCallback, useEffect, useMemo, useState } from 'react';

import { debounce } from 'lodash';

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

export type UseDebouncedStateResponse<T> = [T, (newState: T) => void];

export function useDebouncedState<T>(
  initialState: T,
  timeout: number,
): UseDebouncedStateResponse<T> {
  const [state, setState] = useState(initialState);

  const debouncedSetState = useMemo(() => debounce(setState, timeout), [timeout]);

  useEffect(() => {
    debouncedSetState(initialState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialState]);

  return [state, debouncedSetState];
}
