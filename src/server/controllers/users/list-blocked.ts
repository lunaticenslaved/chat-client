import { ListBlockedUsersResponse } from '#/api/user';
import { createOperation } from '#/server/context';
import { usersPipe } from '#/server/pipes/user';
import { usersService } from '#/server/service/users';

export const listBlocked = createOperation<ListBlockedUsersResponse, void>(
  async (_, requestContext) => {
    const ownerId = requestContext.getUserIdStrict();

    const users = await usersService.listBlockedUsers(ownerId);

    return {
      users: await Promise.all(
        users.map(user => {
          return usersPipe.fromServerToDomain(requestContext, user);
        }),
      ),
    };
  },
);
