import { Fragment } from 'react';

import { DialogsList } from '@/entities/dialog';

import { useSearchInChannels } from '../hooks';

export interface SearchInChannelsResultProps {
  query: string;
}

export function SearchInChannelsResult({ query }: SearchInChannelsResultProps) {
  const searchQuery = useSearchInChannels({ query });

  return (
    <Fragment>
      <DialogsList
        dialogsQuery={searchQuery}
        currentDialogId={undefined}
        onSelectDialog={() => {}}
      />
    </Fragment>
  );
}
