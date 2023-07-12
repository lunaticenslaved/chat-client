import { Empty } from "antd";

import classes from "./chat.module.scss";

export const NoDialogView = () => {
  return (
    <div className={classes.emptyRoot}>
      <Empty description="Выберите диалог, чтобы начать общение" />
    </div>
  );
};
