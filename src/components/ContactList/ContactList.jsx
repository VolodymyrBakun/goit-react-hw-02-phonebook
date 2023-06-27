import { Contact } from "components/Contact/Contact"

export const ContactList = ({ contacts }) => {
    return (
    <>
      <ul>
        {contacts.map(contact => { return <Contact contact={contact} key={contact.id} />;} )}
      </ul>
    </>)
}

