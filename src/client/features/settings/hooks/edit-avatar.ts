import { useMutation } from 'react-query';

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
      const data = await convertToBase64(avatar);
      const { user } = await viewerActions.updateAvatar({ data });
      viewer.set(user);
    },
  });

  // TODO notify on error

  return {
    isLoading,
    isError,
    uploadAvatar: mutate,
  };
}
