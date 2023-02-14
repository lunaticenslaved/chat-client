import React from "react";
import { UserOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Divider } from "antd";

import dayjs from "shared/lib/dayjs";
import { Input } from "shared/components/input";
import { DialogItemProps, DialogItem } from "./dialog-item";

import classes from "./sidebar.module.scss";

type SidebarProps = {
  dialogs: DialogItemProps[];
};

export const Sidebar = (props: SidebarProps) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const sortedDialog = React.useMemo(() => {
    const lds = [...props.dialogs];
    lds.sort((a, b) => {
      const at = dayjs(a.message.time);
      const bt = dayjs(b.message.time);
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

  return (
    <section className={classes.sidebar}>
      <div className={classes.sidebarHeader}>
        <div>
          <UserOutlined className={classes.icon} />
          <h2>Список диалогов</h2>
        </div>
        <EditOutlined className={classes.icon} />
      </div>

      <Divider className={classes.divider} />

      <div className={classes.searchWrapper}>
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
          allowClear
          placeholder="Поиск по контактам"
          prefix={<SearchOutlined className={classes.icon} />}
        />
      </div>

      <Divider className={classes.divider} />

      <div className={classes.dialogsList}>
        {filteredAndSortedDialogs.map((a, idx) => (
          <DialogItem key={idx} {...a} />
        ))}
      </div>
    </section>
  );
};
