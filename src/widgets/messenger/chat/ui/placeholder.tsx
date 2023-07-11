import { Spin, Empty } from "antd";

import classes from "./placeholder.module.scss";

export const LoadingPlaceholder = () => {
  return (
    <div className={classes.root}>
      <Spin size="large" tip="Загрузка сообщений" />
    </div>
  );
};

export const NoMessagesPlaceholder = () => {
  return (
    <div className={classes.root}>
      <Empty description="Нет сообщений" />
    </div>
  );
};
