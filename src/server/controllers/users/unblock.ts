import { BlockUserRequest } from '#/api/user';
import { createOperation } from '#/server/context';
import { usersService } from '#/server/service/users';
import { userEventsEmitter } from '#/server/socket-emitters/user';

export const unblock = createOperation<void, BlockUserRequest>(
  async ({ userId }, requestContext) => {
    const ownerId = requestContext.getUserIdStrict();

    await usersService.unblockUser({ userId, ownerId });
    userEventsEmitter.onUserWasUnblocked({ userId, ownerId });
  },
);
