export interface IsUserInContactsCheckRequest {
  ownerId: string;
  userId: string;
}

export interface AddUserInContactsRequest {
  ownerId: string;
  userId: string;
}

export interface ListContactsRequest {
  ownerId: string;
}

export interface FindContactForUserRequest {
  ownerId: string;
  userId: string;
}
