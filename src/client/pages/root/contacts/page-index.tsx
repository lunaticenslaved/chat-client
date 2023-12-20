import { useEffect } from 'react';

import { ContactsContent, useContactsContext } from '#/client/features/contacts';

const ContactsPage = () => {
  const { refetch } = useContactsContext();

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ContactsContent />;
};

export default ContactsPage;
