import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';

import classes from './search.module.scss';

export type DialogsSearchProps = {
  search: string;
  onChange(value: string): void;
};

// FIXME: Input можно заменить на Search

export function DialogsSearch({ search, onChange }: DialogsSearchProps) {
  return (
    <div className={classes.searchWrapper}>
      <Input
        value={search}
        onChange={e => onChange(e.currentTarget.value)}
        allowClear
        placeholder="Поиск"
        prefix={<SearchOutlined className={classes.icon} />}
      />
    </div>
  );
}
