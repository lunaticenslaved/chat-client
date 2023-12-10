import { PrismaClient } from '@prisma/client';

import { Errors } from '@lunaticenslaved/schema';

import { Helpers } from '#/server/shared/helpers';

import {
  CreateDialogRequest,
  CreateDialogResponse,
  FindOneDialogRequest,
  FindOneDialogResponse,
  GetDialogRequest,
  GetDialogResponse,
  ListDialogRequest,
  ListDialogResponse,
} from './types';
import { prepareDialog, select, selectWithLastMessage } from './utils';

export * from './types';

export class DialogService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async create(data: CreateDialogRequest): Promise<CreateDialogResponse> {
    const dialog = await this.prisma.dialog.create({
      data: {
        userId: data.userId,
        ownerId: data.ownerId,
      },
      select,
    });

    return prepareDialog(dialog);
  }

  async get(data: GetDialogRequest): Promise<GetDialogResponse> {
    const found = await this.prisma.dialog.findUnique({
      where: {
        id: data.dialogId,
      },
      select: selectWithLastMessage,
    });

    if (!found) {
      throw new Errors.NotFoundError({ messages: 'Dialog not found' });
    }

    return prepareDialog(found);
  }

  async list(data: ListDialogRequest): Promise<ListDialogResponse> {
    const dialogs = await this.prisma.dialog.findMany({
      where: {
        ownerId: data.ownerId,
      },
      select: selectWithLastMessage,
      take: data.take,
    });

    return Helpers.orderBy(
      dialogs.map(prepareDialog),
      dialog => dialog.lastMessage?.createdAt,
      'desc',
    );
  }

  async findOne(data: FindOneDialogRequest): Promise<FindOneDialogResponse> {
    const dialog = await this.prisma.dialog.findFirst({
      select: selectWithLastMessage,
      where: {
        userId: data.userId,
        ownerId: data.ownerId,
      },
    });

    return dialog || undefined;
  }
}
