import { useState } from 'react';
import { useDebounce } from 'react-use';

export type UseDebouncedStateResponse<T> = [T, (newState: T) => void];

export function useDebouncedState<T>(
  initialState: T,
  timeout: number,
): UseDebouncedStateResponse<T> {
  const [state, setState] = useState(initialState);

  const [debouncedSetState] = useDebounce(() => setState(initialState), timeout, [initialState]);

  return [state, debouncedSetState];
}
