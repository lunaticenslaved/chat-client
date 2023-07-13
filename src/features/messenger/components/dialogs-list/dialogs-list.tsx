import { useState } from "react";
import { UserOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Empty, Spin } from "antd";

import { Input } from "shared/components/Input";
import { Divider } from "shared/components/divider";
import { DialogModel } from "entities/dialog/store";

import { DialogItem } from "./components/dialog-item";
import { useSortedDialogs, useFilteredDialogs } from "./hooks";

import classes from "./dialogs-list.module.scss";

// FIXME: Input можно заменить на Search

export interface DialogsListProps {
  dialogs: DialogModel[];
  currentDialogId?: number;
  isLoading: boolean;
  isError: boolean;
  onSelectDialog: (dialog: DialogModel) => void;
}

export const DialogsList = ({
  dialogs,
  currentDialogId,
  isLoading,
  isError,
  onSelectDialog,
}: DialogsListProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const sortedDialog = useSortedDialogs(dialogs || []);
  const filteredAndSortedDialogs = useFilteredDialogs(sortedDialog, searchQuery);

  let content: JSX.Element | null = null;
  if (isLoading) {
    content = (
      <div className={classes.emptyWrapper}>
        <Spin tip="Загрузка диалогов " size="large" />
      </div>
    );
  } else if (filteredAndSortedDialogs.length > 0) {
    content = (
      <div className={classes.dialogsList}>
        {filteredAndSortedDialogs.map((dialog, idx) => (
          <DialogItem
            dialog={dialog}
            key={idx}
            onSelect={onSelectDialog}
            isSelected={dialog.id === currentDialogId}
          />
        ))}
      </div>
    );
  } else if (isError) {
    content = (
      <div className={classes.emptyWrapper}>
        <Empty description="Что-то пошло не так" />
      </div>
    );
  } else {
    content = (
      <div className={classes.emptyWrapper}>
        <Empty description="Нет диалогов" />
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
