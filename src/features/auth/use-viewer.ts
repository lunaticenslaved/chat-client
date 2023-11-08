import { ViewerStore } from "@/entities/viewer";
import { useMemo } from "react";
import { useAppSelector } from "@/config/store";

export const useViewer = () => {
  const viewer = useAppSelector(ViewerStore.selectors.selectViewer);
  const isAuthorized = useMemo(() => !!viewer, [viewer]);
  const isActivated = useMemo(() => !!viewer?.isActivated, [viewer?.isActivated]);

  return {
    isAuthorized,
    isActivated,
    viewer,
  };
};
