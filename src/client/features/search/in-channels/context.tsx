import { ReactNode, createContext, useContext, useMemo, useState } from 'react';

export interface ISearchContext {
  query: string;

  setQuery(value: string): void;
}

export type SearchContextProps = {
  children?: ReactNode | ((value: ISearchContext) => ReactNode | JSX.Element);
};

const Context = createContext<ISearchContext | undefined>(undefined);

function Provider({ children }: SearchContextProps) {
  const [query, setQuery] = useState('');

  const value: ISearchContext = useMemo(
    () => ({
      query,
      setQuery,
    }),
    [query],
  );

  return (
    <Context.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </Context.Provider>
  );
}

export function SearchContext(props: SearchContextProps) {
  const existingContext = useContext(Context);

  if (existingContext) {
    const { children } = props;
    return typeof children === 'function' ? children(existingContext) : children;
  }

  return <Provider {...props} />;
}

export function useSearchContext() {
  const context = useContext(Context);

  if (!context) {
    throw new Error('Search context required!');
  }

  return context;
}
