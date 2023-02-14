import React from "react";
import { UserOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Empty } from "antd";

import dayjs from "shared/lib/dayjs";
import { Input } from "shared/components/input";
import { Divider } from "shared/components/divider";

import { DialogItem } from "./dialog-item";
import classes from "./sidebar.module.scss";
import { DialogModel } from "../types";

// FIXME: Input можно заменить на Search

type SidebarProps = {
  dialogs: DialogModel[];
  selectedDialog: DialogModel | null | undefined;
  onDialogSelected: (dialog: DialogModel) => void;
};

export const Sidebar = (props: SidebarProps) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const sortedDialog = React.useMemo(() => {
    const lds = [...props.dialogs];
    lds.sort((a, b) => {
      const at = dayjs(a.lastMessage.time);
      const bt = dayjs(b.lastMessage.time);
      if (at.isAfter(bt)) return -1;
      if (at.isBefore(bt)) return 1;
      return 0;
    });
    return lds;
  }, [props.dialogs]);

  const filteredAndSortedDialogs = React.useMemo(() => {
    if (!searchQuery) return sortedDialog;
    const s = searchQuery.toLowerCase();
    return sortedDialog.filter((d) => d.user.name.toLowerCase().includes(s));
  }, [searchQuery, sortedDialog]);

  const onDialogSelect = (dialog: DialogModel) => {
    props.onDialogSelected(dialog);
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
            isSelected={dialog.id === props.selectedDialog?.id}
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
