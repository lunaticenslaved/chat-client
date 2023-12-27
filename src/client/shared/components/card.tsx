import { ComponentProps } from 'react';

import { css } from '@emotion/react';
import cn from 'classnames';

// Card
export interface CardProps extends ComponentProps<'div'> {}

const cardCSS = css`
  border-radius: 20px;

  & > .card-part {
    &:not(:last-child) {
      padding-bottom: 0;
    }
  }
`;

export function Card(props: CardProps) {
  return <div {...props} css={cardCSS} />;
}

// Card title
export interface CardTitleProps extends ComponentProps<'div'> {}

const cardTitleCSS = css`
  padding: 40px;
`;

export function CardTitle({ className, ...props }: CardTitleProps) {
  return <div {...props} css={cardTitleCSS} className={cn(className, 'card-part')} />;
}

// Card content
export interface CardContentProps extends ComponentProps<'div'> {}

const cardContentCSS = css`
  padding: 40px;
`;

export function CardContent({ className, ...props }: CardContentProps) {
  return <div {...props} css={cardContentCSS} className={cn(className, 'card-part')} />;
}
