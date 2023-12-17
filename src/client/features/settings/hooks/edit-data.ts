import { useMutation } from 'react-query';

import { message } from 'antd';

import { UpdateInfoRequest } from '@lunaticenslaved/schema/dist/types/actions';

import { viewerActions } from '#/api/viewer';
import { useViewer } from '#/client/entities/viewer';

import { Handlers } from '../../../shared/types';

type UserData = {
  login: string;
  email: string;
};

export type IEditData = {
  isLoading: boolean;
  isError: boolean;
  updateData(value: UserData): Promise<void>;
};

export function useEditData({ onSuccess, onError }: Handlers = {}): IEditData {
  const viewer = useViewer();
  const { mutateAsync, isError, isLoading } = useMutation({
    mutationKey: 'edit-account-data',
    mutationFn: async (data: UpdateInfoRequest) => {
      try {
        const { user } = await viewerActions.updateInfo({ data });
        viewer.set(user);
        onSuccess && onSuccess();
      } catch (error) {
        message.error((error as Error).message);
        onError && onError;
      }
    },
  });

  return {
    isLoading,
    isError,
    updateData: mutateAsync,
  };
}
