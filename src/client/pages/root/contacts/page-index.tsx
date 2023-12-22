import { ContactsContent, ContactsSidebar } from '#/client/features/contacts';

const ContactsPage = () => {
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
