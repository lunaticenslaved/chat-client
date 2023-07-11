import React from "react";

import dayjs from "shared/lib/dayjs";
import { DialogModel } from "features/dialogs/store";

export const useSortedDialogs = (dialogs: DialogModel[]) => {
  return React.useMemo(() => {
    const lds = [...dialogs];
    lds.sort((a, b) => {
      const at = dayjs(a.lastMessage.createdAt);
      const bt = dayjs(b.lastMessage.createdAt);

      if (!at && at) return -1;
      if (at && !at) return 1;
      if (!at && !at) return 0;

      if (at.isAfter(bt)) return -1;
      if (at.isBefore(bt)) return 1;
      return 0;
    });
    return lds;
  }, [dialogs]);
};

export const useFilteredDialogs = (dialogs: DialogModel[], searchQuery: string) => {
  return React.useMemo(() => {
    if (!searchQuery) return dialogs;
    const s = searchQuery.toLowerCase();
    return dialogs.filter((d) => d.user.name.toLowerCase().includes(s));
  }, [searchQuery, dialogs]);
};
