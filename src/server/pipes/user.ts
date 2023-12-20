import schema from '@lunaticenslaved/schema';

import { User as DomainUser } from '#/domain/user';
import { User as ServiceUser } from '#/server/service/users';
import { IRequestContext } from '#/server/shared/operation';

class UsersPipe {
  async fromServerToDomain(
    requestContext: IRequestContext,
    serviceUser: ServiceUser,
  ): Promise<DomainUser> {
    const { user } = await schema.actions.users.get({
      data: { userId: serviceUser.id },
      config: {
        headers: {
          Origin: requestContext.origin,
        },
      },
    });

    return user;
  }
}

export const usersPipe = new UsersPipe();
