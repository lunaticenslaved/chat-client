import { Spin, SpinProps } from 'antd';

export interface CircularProgressProps extends Pick<SpinProps, 'size'> {}

export function CircularProgress(props: CircularProgressProps) {
  return <Spin {...props} />;
}
