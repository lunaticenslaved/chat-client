import { RefObject, useEffect, useState } from 'react';

export function useHover(refObject: RefObject<HTMLElement>): boolean {
  const [isHovered, setHovered] = useState(false);

  useEffect(() => {
    refObject.current?.addEventListener('mouseenter', () => setHovered(true));
    refObject.current?.addEventListener('mouseleave', () => setHovered(false));
  }, [refObject]);

  return isHovered;
}
