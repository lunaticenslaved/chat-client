import dayjs from '#/client/shared/lib/dayjs';

export function formatMessageTime(date: string | Date, type?: 'exact'): string {
  if (type === 'exact') {
    return dayjs(date).format('LLL');
  }

  return dayjs(date).fromNow();
}
