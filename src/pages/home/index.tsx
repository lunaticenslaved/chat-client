import React from "react";
import { UserOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Divider } from "antd";

import dayjs from "shared/lib/dayjs";
import { Input } from "shared/components/input";
import { OnlineStatus } from "shared/components/online-status";
import { DialogItemProps, DialogsList } from "widgets/messenger/dialogs-list";
import { Chat } from "widgets/messenger/chat";

import classes from "./home-page.module.scss";

type HomePageProps = {};

const dialogs: DialogItemProps[] = [
  {
    user: {
      id: 1,
      isOnline: true,
      name: "Федор Михайлович Достоевский",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Fyodor_Mikhailovich_Dostoyevsky_1876.jpg/274px-Fyodor_Mikhailovich_Dostoyevsky_1876.jpg",
    },
    message: {
      isRead: false,
      senderId: 1,
      text: "Мы все свидетельствуем Вам глубочайшее наше почтение и целуем Ваши ручки, дражайший папенька",
      time: dayjs().subtract(1, "minutes").toISOString(),
    },
    notReadMessages: 121222,
  },
  {
    user: {
      id: 1,
      isOnline: true,
      name: "Федор Михайлович Достоевский",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Fyodor_Mikhailovich_Dostoyevsky_1876.jpg/274px-Fyodor_Mikhailovich_Dostoyevsky_1876.jpg",
    },
    message: {
      isRead: false,
      senderId: 1,
      text: "Мы все свидетельствуем Вам глубочайшее наше почтение и целуем Ваши ручки, дражайший папенька",
      time: dayjs().subtract(1, "minutes").toISOString(),
    },
    notReadMessages: 121222,
  },
  {
    user: {
      id: 1,
      isOnline: true,
      name: "Федор Михайлович Достоевский",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Fyodor_Mikhailovich_Dostoyevsky_1876.jpg/274px-Fyodor_Mikhailovich_Dostoyevsky_1876.jpg",
    },
    message: {
      isRead: false,
      senderId: 1,
      text: "Мы все свидетельствуем Вам глубочайшее наше почтение и целуем Ваши ручки, дражайший папенька",
      time: dayjs().subtract(1, "minutes").toISOString(),
    },
    notReadMessages: 121222,
  },
  {
    user: {
      id: 1,
      isOnline: true,
      name: "Федор Михайлович Достоевский",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Fyodor_Mikhailovich_Dostoyevsky_1876.jpg/274px-Fyodor_Mikhailovich_Dostoyevsky_1876.jpg",
    },
    message: {
      isRead: false,
      senderId: 1,
      text: "Мы все свидетельствуем Вам глубочайшее наше почтение и целуем Ваши ручки, дражайший папенька",
      time: dayjs().subtract(1, "minutes").toISOString(),
    },
    notReadMessages: 121222,
  },
  {
    user: {
      id: 1,
      isOnline: true,
      name: "Федор Михайлович Достоевский",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Fyodor_Mikhailovich_Dostoyevsky_1876.jpg/274px-Fyodor_Mikhailovich_Dostoyevsky_1876.jpg",
    },
    message: {
      isRead: false,
      senderId: 1,
      text: "Мы все свидетельствуем Вам глубочайшее наше почтение и целуем Ваши ручки, дражайший папенька",
      time: dayjs().subtract(1, "minutes").toISOString(),
    },
    notReadMessages: 121222,
  },
  {
    user: {
      id: 1,
      isOnline: true,
      name: "Федор Михайлович Достоевский",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Fyodor_Mikhailovich_Dostoyevsky_1876.jpg/274px-Fyodor_Mikhailovich_Dostoyevsky_1876.jpg",
    },
    message: {
      isRead: false,
      senderId: 1,
      text: "Мы все свидетельствуем Вам глубочайшее наше почтение и целуем Ваши ручки, дражайший папенька",
      time: dayjs().subtract(1, "minutes").toISOString(),
    },
    notReadMessages: 121222,
  },
  {
    user: {
      id: 1,
      isOnline: true,
      name: "Федор Михайлович Достоевский",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Fyodor_Mikhailovich_Dostoyevsky_1876.jpg/274px-Fyodor_Mikhailovich_Dostoyevsky_1876.jpg",
    },
    message: {
      isRead: false,
      senderId: 1,
      text: "Мы все свидетельствуем Вам глубочайшее наше почтение и целуем Ваши ручки, дражайший папенька",
      time: dayjs().subtract(1, "minutes").toISOString(),
    },
    notReadMessages: 121222,
  },
  {
    user: {
      id: 1,
      isOnline: true,
      name: "Федор Михайлович Достоевский",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Fyodor_Mikhailovich_Dostoyevsky_1876.jpg/274px-Fyodor_Mikhailovich_Dostoyevsky_1876.jpg",
    },
    message: {
      isRead: false,
      senderId: 1,
      text: "Мы все свидетельствуем Вам глубочайшее наше почтение и целуем Ваши ручки, дражайший папенька",
      time: dayjs().subtract(1, "minutes").toISOString(),
    },
    notReadMessages: 121222,
  },
  {
    user: {
      id: 1,
      isOnline: true,
      name: "Федор Михайлович Достоевский",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Fyodor_Mikhailovich_Dostoyevsky_1876.jpg/274px-Fyodor_Mikhailovich_Dostoyevsky_1876.jpg",
    },
    message: {
      isRead: false,
      senderId: 1,
      text: "Мы все свидетельствуем Вам глубочайшее наше почтение и целуем Ваши ручки, дражайший папенька",
      time: dayjs().subtract(1, "minutes").toISOString(),
    },
    notReadMessages: 121222,
  },
  {
    user: {
      id: 1,
      isOnline: true,
      name: "Федор Михайлович Достоевский",
      avatar: null,
    },
    message: {
      isRead: true,
      senderId: 0,
      text: "Мы все свидетельствуем Вам глубочайшее наше почтение и целуем Ваши ручки, дражайший папенька",
      time: dayjs().subtract(1, "day").toISOString(),
    },
    notReadMessages: 0,
  },

  {
    user: {
      id: 1,
      isOnline: false,
      name: "Федор Михайлович Достоевский",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Fyodor_Mikhailovich_Dostoyevsky_1876.jpg/274px-Fyodor_Mikhailovich_Dostoyevsky_1876.jpg",
    },
    message: {
      isRead: false,
      senderId: 2,
      text: "Мы все свидетельствуем Вам глубочайшее наше почтение и целуем Ваши ручки, дражайший папенька",
      time: dayjs().subtract(1, "month").toISOString(),
    },
    notReadMessages: 0,
  },
  {
    user: {
      id: 1,
      isOnline: false,
      name: "Федор Михайлович Достоевский",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Fyodor_Mikhailovich_Dostoyevsky_1876.jpg/274px-Fyodor_Mikhailovich_Dostoyevsky_1876.jpg",
    },
    message: {
      isRead: true,
      senderId: 1,
      text: "Мы все свидетельствуем Вам глубочайшее наше почтение и целуем Ваши ручки, дражайший папенька",
      time: dayjs().subtract(1, "week").toISOString(),
    },
    notReadMessages: 0,
  },
];

const HomePage = (props: HomePageProps) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredDialogs = React.useMemo(() => {
    if (!searchQuery) return dialogs;
    const s = searchQuery.toLowerCase();
    return dialogs.filter((d) => d.user.name.toLowerCase().includes(s));
  }, [searchQuery]);

  return (
    <div className={classes.root}>
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

        <DialogsList
          dialogs={filteredDialogs}
          className={classes.dialogsList}
        />
      </section>

      <Divider type="vertical" className={classes.dividerVertical} />

      <section className={classes.chat}>
        <div className={classes.chatHeader}>
          <h2>wow</h2>
          <div className={classes.onlineStatus}>
            <OnlineStatus isOnline={true} />
            <span>онлайн</span>
          </div>
        </div>

        <Divider className={classes.divider} />

        <div className={classes.chatWrapper}>
          <Chat />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
