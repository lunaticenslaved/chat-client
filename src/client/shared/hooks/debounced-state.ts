import { useEffect, useMemo, useState } from 'react';

import { debounce } from 'lodash';

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
