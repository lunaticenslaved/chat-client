import { Placeholder } from '#/client/shared/components/placeholder';

export function ErrorView() {
  return <Placeholder view="error" text="Something went. Try reload the page" />;
}

export function NoDialogView() {
  return <Placeholder view="empty" text="Select a dialog to start messaging" />;
}

export function NoMessagesView() {
  return <Placeholder view="empty" text="No messages" />;
}

export const LoadingMessagesView = () => {
  return <Placeholder view="loading" text="Loading messages" />;
};
