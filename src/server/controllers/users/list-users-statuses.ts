import { ListUsersStatusesResponse } from '#/api/user';
import { createOperation } from '#/server/context';
import { usersService } from '#/server/service/users';

export const listUsersStatuses = createOperation<ListUsersStatusesResponse, void>(
  async (_, requestContext) => {
    const ownerId = requestContext.getUserIdStrict();

    const blockedUsers = await usersService.listBlockedUsers(ownerId);
    const usersWhoBlockedMe = await usersService.listUsersWhoBlockedMe(ownerId);

    return {
      blockedUsers,
      usersWhoBlockedMe,
    };
  },
);
