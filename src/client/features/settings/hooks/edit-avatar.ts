import { useMutation } from 'react-query';

import { message } from 'antd';

import { viewerActions } from '#/api/viewer';
import { useViewer } from '#/client/entities/viewer';
import { convertToBase64 } from '#/client/shared/files';

export interface IEditAvatar {
  isLoading: boolean;
  isError: boolean;
  uploadAvatar(file: File): void;
}

export function useEditAvatar(): IEditAvatar {
  const viewer = useViewer();
  const { mutate, isError, isLoading } = useMutation({
    mutationKey: 'edit-avatar',
    mutationFn: async (avatar: File) => {
      try {
        const data = await convertToBase64(avatar);
        const { user } = await viewerActions.updateAvatar({ data });
        viewer.set(user);
      } catch (error) {
        message.error((error as Error).message);
      }
    },
  });

  return {
    isLoading,
    isError,
    uploadAvatar: mutate,
  };
}
