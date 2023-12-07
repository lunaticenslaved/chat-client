import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';

import classes from './search.module.scss';

export type SearchInChannelsInputProps = {
  search: string;
  onChange(value: string): void;
};

// FIXME: Input можно заменить на Search

export function SearchInChannelsInput({ search, onChange }: SearchInChannelsInputProps) {
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
