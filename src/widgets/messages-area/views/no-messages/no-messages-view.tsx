import { Empty } from 'antd';

import classes from './no-messages-view.module.scss';

export const NoMessagesView = () => {
  return (
    <div className={classes.root}>
      <Empty description="Нет сообщений" />
    </div>
  );
};
