import { useMemo } from 'react';
import { useQuery } from 'react-query';

import { api } from '#/client/shared/api';
import { useDebouncedState } from '#/client/shared/hooks';
import { Dialog } from '#/domain/dialog';
import { User } from '#/domain/user';

export interface UseSearchInChannelsRequest {
  query: string;
}
export interface UseSearchInChannelsResponse {
  isLoading: boolean;
  isError: boolean;
  users: User[];
  existingDialogs: Dialog[];
}

export function useSearchInChannels(
  props: UseSearchInChannelsRequest,
): UseSearchInChannelsResponse {
  const [query] = useDebouncedState(props.query, 300);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['search/in-channels', query],
    queryFn: () => api.actions.search.inChannels({ data: { search: query } }),
  });

  return useMemo(
    () => ({
      isError,
      isLoading,
      users: data?.users || [],
      existingDialogs: data?.existingDialogs || [],
    }),
    [data?.existingDialogs, data?.users, isLoading, isError],
  );
}
