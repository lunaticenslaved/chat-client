import { Spin } from "antd";

import classes from "./loading-messages-view.module.scss";

export const LoadingMessagesView = () => {
  return (
    <div className={classes.root}>
      <Spin size="large" tip="Загрузка сообщений" />
    </div>
  );
};
