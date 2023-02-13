import dayjs from "shared/lib/dayjs";
import { DialogItemProps, DialogsList } from "widgets/messenger/dialogs-list";
import { Dialog } from "widgets/messenger/dialog";

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
  return (
    <div className={classes.root}>
      <DialogsList dialogs={dialogs} className={classes.sidebar} />
      <Dialog className={classes.messages} />
    </div>
  );
};

export default HomePage;
