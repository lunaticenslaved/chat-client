import { useCallback, useMemo, useState } from 'react';

type State = 'dragging-files' | 'none' | 'uploading-files';

export interface IFileUpload {
  state: State;
  setState(value: State): void;
  setDragging(): void;
  cancelDragging(): void;
  uploadFiles(files: File[]): void;
}

interface UseFileUploadProps {
  onFilesUpload(files: File[]): void;
}

export function useFileUpload({ onFilesUpload }: UseFileUploadProps): IFileUpload {
  const [state, setState] = useState<State>('none');

  const { setDragging, cancelDragging } = useMemo(
    () => ({
      setDragging() {
        setState('dragging-files');
      },
      cancelDragging() {
        setState('none');
      },
    }),
    [],
  );

  const uploadFiles = useCallback(
    (files: File[]) => {
      console.log('wow');
      onFilesUpload(files);
      cancelDragging();
    },
    [cancelDragging, onFilesUpload],
  );

  return useMemo(
    () => ({
      state,
      setState,
      setDragging,
      cancelDragging,
      uploadFiles,
    }),
    [cancelDragging, setDragging, state, uploadFiles],
  );
}
