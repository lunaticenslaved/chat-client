import { Prisma } from '@prisma/client';

import { DialogFull } from '#/server/models';

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
    id: string;
    text: string;
    createdAt: Date;
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
  const message = messages?.[0];

  // TODO: add more actual types
  return {
    ...dialog,
    lastMessage: message
      ? {
          id: message.id,
          text: message.text,
          isRead: false,
          attachments: [],
          createdAt: message.createdAt.toISOString(),
          author: {
            id: 'wow',
            login: 'TEST',
            email: 'test@test.com',
            avatar: null,
          },
        }
      : undefined,
    notReadMessagesCount: _count.messages || 0,
  };
}
