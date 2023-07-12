import { viewerSelectors } from "entities/viewer/store";
import { useMemo } from "react";
import { useAppSelector } from "store";

export const useViewer = () => {
  const viewer = useAppSelector(viewerSelectors.selectViewer);
  const isAuthorized = useMemo(() => !!viewer, [viewer]);
  const isActivated = useMemo(() => !!viewer?.isActivated, [viewer?.isActivated]);

  return {
    isAuthorized,
    isActivated,
    viewer,
  };
};
