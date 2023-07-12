import { Spin } from "antd";

import classes from "./page-loader.module.scss";

export const PageLoader = () => {
  return (
    <div className={classes.root}>
      <Spin size="large" tip="Загрузка..." />
    </div>
  );
};
