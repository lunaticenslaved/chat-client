import { BlockUserRequest } from '#/api/user';
import { createOperation } from '#/server/context';
import { usersService } from '#/server/service/users';
import { userEventsEmitter } from '#/server/socket-emitters/user';

export const block = createOperation<void, BlockUserRequest>(async ({ userId }, requestContext) => {
  const ownerId = requestContext.getUserIdStrict();

  await usersService.blockUser({ userId, ownerId });
  userEventsEmitter.onUserWasBlocked({ userId, ownerId });
});
