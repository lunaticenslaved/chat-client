import { Request } from 'express';

import { PrismaClient } from '@prisma/client';

import schema from '@lunaticenslaved/schema';

import { IService } from '@/context/service';
import { ListDialogRequest } from '@/context/service/dialog/types';
import { DialogFullWithPartner } from '@/models';
import { getToken } from '@/shared/request';

import { ListDialogResponse } from './types';

export class DialogsMetaService {
  private service: IService;

  constructor(_: PrismaClient, service: IService) {
    this.service = service;
  }

  async listWithPartners(req: Request, data: ListDialogRequest): Promise<ListDialogResponse> {
    const { search } = data;

    const dialogs = await this.service.dialog.list(data);
    const { users } = await schema.actions.users.list({
      data: { userIds: dialogs.map(d => d.partnerId), search },
      token: getToken(req),
      config: {
        headers: {
          Origin: req.headers.origin,
        },
      },
    });

    return dialogs.reduce<DialogFullWithPartner[]>((acc, dialog) => {
      const partner = users.find(p => p.id === dialog.partnerId);

      if (partner) {
        acc.push({ ...dialog, partner });
      }

      return acc;
    }, []);
  }
}
