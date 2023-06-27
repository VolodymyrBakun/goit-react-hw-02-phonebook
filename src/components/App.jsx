import { Component } from "react";
import { nanoid } from 'nanoid';
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };


  onFormSubmit = (event, contactData) => {
    event.preventDefault();
    if (contactData.name === '' || contactData.number === '') {
      alert("Please fill in the name and phone number!");
      return;
    }

    const isExist = this.state.contacts.some(
      contact => contact.name.toLowerCase() === contactData.name.toLowerCase()
    );

if ( isExist ) {
  alert(`${contactData.name} is already in contacts.`);
  return;
}

    const contact = {
      id: nanoid(),
      name: contactData.name,
      number: contactData.number,
    };
    this.setState({
      contacts: [...this.state.contacts, contact],
    });
  };


  handleSearch = event => {
    this.setState({
      filter: event.target.value,
    });
  };

  contactsToRender = () => {
   const normalizedFilter = this.state.filter.toLowerCase();
return this.state.contacts.filter(contact =>
  contact.name.toLowerCase().includes(normalizedFilter)
);
  }

  render() {
    const contactsData = this.contactsToRender();
    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.onFormSubmit} />

        <h2>Contacts</h2>
        <Filter filter={this.state.filter} handleSearch={this.handleSearch } />
        <ContactList contacts={contactsData} />
      </>
    );
  }
};
