import { CSSProperties, ComponentProps, ReactNode, forwardRef } from 'react';

import { SerializedStyles, css } from '@emotion/react';

export interface FlexProps extends ComponentProps<'div'> {
  children: ReactNode;
  direction?: CSSProperties['flexDirection'];
  wrap?: CSSProperties['flexWrap'];
  alignItems?: CSSProperties['alignItems'];
  justifyContent?: CSSProperties['justifyContent'];
  css?: SerializedStyles;
}

export const Flex = forwardRef<HTMLDivElement, FlexProps>(function Flex(
  { justifyContent, alignItems, wrap, direction, children, ...props },
  ref,
) {
  return (
    <div
      {...props}
      ref={ref}
      css={css`
        display: flex;
        flex-direction: ${direction};
        wrap: ${wrap};
        align-items: ${alignItems};
        justify-content: ${justifyContent};
      `}>
      {children}
    </div>
  );
});
