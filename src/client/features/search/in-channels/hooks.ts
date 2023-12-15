import { useMemo } from 'react';
import { useQuery } from 'react-query';

import { searchActions } from '#/api/search';
import { useDebouncedState } from '#/client/shared/hooks';
import { Connection } from '#/domain/connection';
import { User } from '#/domain/user';

export interface UseSearchInChannelsRequest {
  query: string;
}
export interface UseSearchInChannelsResponse {
  isLoading: boolean;
  isError: boolean;
  users: User[];
  existingDialogs: Connection[];
}

export function useSearchInChannels(
  props: UseSearchInChannelsRequest,
): UseSearchInChannelsResponse {
  const [query] = useDebouncedState(props.query, 300);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['search/in-channels', query],
    queryFn: () => searchActions.inChannels({ data: { search: query } }),
  });

  return useMemo(
    () => ({
      isError,
      isLoading,
      users: data?.users || [],
      existingDialogs: data?.connections || [],
    }),
    [data?.connections, data?.users, isLoading, isError],
  );
}
