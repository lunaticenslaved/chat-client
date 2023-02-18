import React from "react";
import { UserOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Empty } from "antd";

import { Input } from "shared/components/input";
import { Divider } from "shared/components/divider";
import { useAppDispatch, useAppSelector } from "shared/hooks";
import {
  DialogModel,
  dialogsActions,
  dialogsSelectors,
} from "features/dialogs/store";

import { DialogItem } from "./dialog-item";
import { useSortedDialogs, useFilteredDialogs } from "../hooks";

import classes from "./sidebar.module.scss";

// FIXME: Input можно заменить на Search

export const Sidebar = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const currentDialog = useAppSelector(dialogsSelectors.selectCurrentDialog);
  const dialogs = useAppSelector(dialogsSelectors.selectDialogs);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(dialogsActions.fetchDialogs());
  });

  const sortedDialog = useSortedDialogs(dialogs);
  const filteredAndSortedDialogs = useFilteredDialogs(
    sortedDialog,
    searchQuery
  );

  const onDialogSelect = (dialog: DialogModel) => {
    dispatch(dialogsActions.setCurrentDialog(dialog));
  };

  let content: JSX.Element | null = null;

  if (filteredAndSortedDialogs.length > 0) {
    content = (
      <div className={classes.dialogsList}>
        {filteredAndSortedDialogs.map((dialog, idx) => (
          <DialogItem
            dialog={dialog}
            key={idx}
            onSelect={onDialogSelect}
            isSelected={dialog.id === currentDialog?.id}
          />
        ))}
      </div>
    );
  } else {
    content = (
      <div className={classes.emptyWrapper}>
        <Empty description={"Нет диалогов"} />
      </div>
    );
  }

  return (
    <section className={classes.sidebar}>
      <div className={classes.sidebarHeader}>
        <div>
          <UserOutlined className={classes.icon} />
          <h2>Список диалогов</h2>
        </div>
        <EditOutlined className={classes.icon} />
      </div>

      <Divider />

      <div className={classes.searchWrapper}>
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
          allowClear
          placeholder="Поиск по контактам"
          prefix={<SearchOutlined className={classes.icon} />}
        />
      </div>

      <Divider />

      {content}
    </section>
  );
};
