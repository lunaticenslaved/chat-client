import { CSSProperties, ComponentProps, ReactNode, forwardRef } from 'react';

import { SerializedStyles, css } from '@emotion/react';

export interface FlexProps extends ComponentProps<'div'> {
  children: ReactNode;
  direction?: CSSProperties['flexDirection'];
  wrap?: CSSProperties['flexWrap'];
  flex?: CSSProperties['flex'];
  alignItems?: CSSProperties['alignItems'];
  justifyContent?: CSSProperties['justifyContent'];
  css?: SerializedStyles;
  fill?: boolean;
}

export const Flex = forwardRef<HTMLDivElement, FlexProps>(function Flex(
  { justifyContent, alignItems, wrap, direction, children, flex, fill, ...props },
  ref,
) {
  return (
    <div
      {...props}
      ref={ref}
      css={css`
        height: ${fill ? '100%' : ''};
        width: ${fill ? '100%' : ''};
        display: flex;
        flex-direction: ${direction};
        flex: ${flex};
        wrap: ${wrap};
        align-items: ${alignItems};
        justify-content: ${justifyContent};
      `}>
      {children}
    </div>
  );
});
