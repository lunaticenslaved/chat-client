import schema from '@lunaticenslaved/schema';

import { ListDialogRequest } from '#/server/context/service';
import { DialogFullWithPartner } from '#/server/models';

import { BaseMetaService } from '../base-metaservice';

import { ListDialogResponse } from './types';

export class DialogsMetaService extends BaseMetaService {
  async listWithPartners(data: ListDialogRequest): Promise<ListDialogResponse> {
    const { search } = data;

    const dialogs = await this.service.dialog.list(data);
    const { users } = await schema.actions.users.list({
      data: { userIds: dialogs.map(d => d.partnerId), search },
      config: {
        headers: {
          Origin: data.origin,
        },
      },
    });

    return dialogs.reduce<DialogFullWithPartner[]>((acc, dialog) => {
      const partner = users.find(p => p.id === dialog.partnerId);

      if (partner) {
        acc.push({ ...dialog, user: partner });
      }

      return acc;
    }, []);
  }
}
