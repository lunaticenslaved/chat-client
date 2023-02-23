import { Spin } from "antd";

import classes from "./spinner-container.module.scss";

export const SpinnerContainer = () => {
  return (
    <div className={classes.root}>
      <Spin size="large" tip="Загрузка..." />
    </div>
  );
};
