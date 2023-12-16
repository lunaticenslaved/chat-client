import { Typography } from 'antd';

export type ErrorCardProps = {
  title: string;
};

export function ErrorCard({ title }: ErrorCardProps) {
  return <Typography.Paragraph>{title}</Typography.Paragraph>;
}
