import { Request } from 'express';

import schema from '@lunaticenslaved/schema';

import { ListDialogRequest } from '@/context/service';
import { DialogFullWithPartner } from '@/models';
import { getToken } from '@/shared/request';

import { BaseMetaService } from '../base-metaservice';

import { ListDialogResponse } from './types';

export class DialogsMetaService extends BaseMetaService {
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
