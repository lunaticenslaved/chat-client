export interface ErrorLayoutProps {
  title: string;
}

export const ErrorLayout = ({ title }: ErrorLayoutProps) => {
  return <div>{title}</div>;
};
