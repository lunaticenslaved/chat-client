import { FunctionComponent, Suspense } from 'react';

import { PageLoader } from '#/client/shared/components/page-loader';

export function withLoadPage<TProps extends object>(Page: FunctionComponent<TProps>) {
  const component = (props: TProps) => {
    return (
      <Suspense fallback={<PageLoader />}>
        <Page {...props} />
      </Suspense>
    );
  };

  return component;
}
