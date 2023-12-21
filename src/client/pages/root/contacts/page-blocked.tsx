import { BlockedUsersContent, BlockedUsersSidebar } from '#/client/features/contacts';

const BlockedUsersPage = () => {
  return (
    <>
      <BlockedUsersSidebar />

      <div style={{ flex: '1 1 auto' }}>
        <BlockedUsersContent />
      </div>
    </>
  );
};

export default BlockedUsersPage;
