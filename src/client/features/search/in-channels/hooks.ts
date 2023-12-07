import { useMemo } from 'react';
import { useQuery } from 'react-query';

import { Dialog, User } from '@common/models';

import { api } from '@/shared/api';
import { useDebouncedState } from '@/shared/hooks';

export interface UseSearchInChannelsRequest {
  query: string;
}
export interface UseSearchInChannelsResponse {
  isLoading: boolean;
  isError: boolean;
  users: User[];
  dialogs: Dialog[];
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
      dialogs: data?.dialogs || [],
    }),
    [data?.dialogs, data?.users, isLoading, isError],
  );
}
