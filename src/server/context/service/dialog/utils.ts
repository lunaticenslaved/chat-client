import { Prisma } from '@prisma/client';

import { DialogFull } from '@/models';

export const select = {
  partnerId: true,
  ownerId: true,
  id: true,
  createdAt: true,
  updatedAt: true,
  _count: {
    select: {
      messages: {
        where: {
          isRead: { equals: false },
        },
      },
    },
  },
};

interface PrepareDialogRequest {
  messages?: {
    id: number;
    text: string;
    authorId: string;
    createdAt: Date;
    isRead: boolean;
  }[];
  partnerId: string;
  ownerId: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  _count: {
    messages: number;
  };
}

export const selectWithLastMessage = {
  ...select,
  messages: {
    take: 1,
    select: {
      id: true,
      text: true,
      createdAt: true,
      isRead: true,
      authorId: true,
    },
    orderBy: {
      createdAt: 'desc' as Prisma.SortOrder,
    },
  },
};

export function prepareDialog(notPreparedDialog: PrepareDialogRequest): DialogFull {
  const { _count, messages, ...dialog } = notPreparedDialog;

  return {
    ...dialog,
    lastMessage: messages?.[0],
    notReadMessagesCount: _count.messages || 0,
  };
}
