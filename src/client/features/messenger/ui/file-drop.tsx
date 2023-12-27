import { PropsWithChildren } from 'react';
import Dropzone from 'react-dropzone';

import { css } from '@emotion/react';

import { Flex } from '#/client/shared/components/flex';

import { useMessengerContext } from '../context';

const backgroundCSS = css`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 999;
  background-color: rgba(0, 0, 0, 50%);
`;

export function FileDrop({ children }: PropsWithChildren) {
  const { filesUpload } = useMessengerContext();
  const { uploadFiles } = filesUpload;

  return (
    <Dropzone noClick noKeyboard onDrop={uploadFiles}>
      {({ getRootProps, isDragActive }) => {
        return (
          <div {...getRootProps()} style={{ display: 'contents' }}>
            {children}
            {isDragActive && (
              <Flex fill alignItems="center" justifyContent="center" css={backgroundCSS}>
                <p>Drop some files here</p>
              </Flex>
            )}
          </div>
        );
      }}
    </Dropzone>
  );
}
