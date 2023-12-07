import { useMemo } from 'react';
import { useQuery } from 'react-query';

import { Dialog, User } from '@common/models';

import { api } from '@/shared/api';

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
  const { query } = props;

  console.log(
    api.actions.search.inChannels({ data: { search: query } }).then(data => console.log(data)),
  );

  const { data, isLoading, isError, isFetched } = useQuery({
    queryKey: ['search/in-channels', query],
    queryFn: () => api.actions.search.inChannels({ data: { search: query } }),
  });

  console.log('isFetched', isFetched);

  console.log({
    isError,
    isLoading,
    users: data?.users || [],
    dialogs: data?.dialogs || [],
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
