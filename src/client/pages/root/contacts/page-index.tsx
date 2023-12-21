import { useEffect } from 'react';

import { ContactsContent, ContactsSidebar, useContactsContext } from '#/client/features/contacts';

const ContactsPage = () => {
  const { refetch } = useContactsContext();

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ContactsSidebar />

      <div style={{ flex: '1 1 auto' }}>
        <ContactsContent />
      </div>
    </>
  );
};

export default ContactsPage;
