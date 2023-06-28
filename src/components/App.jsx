import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import PropTypes from 'prop-types';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  onFormSubmit = (event, contactData) => {
    event.preventDefault();
    if (contactData.name === '') {
      alert('Please fill in the name and phone number!');
      return;
    }

    const isExist = this.state.contacts.some(
      contact => contact.name.toLowerCase() === contactData.name.toLowerCase()
    );

    if (isExist) {
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
  };

  handleDelete = idToDelete => {
    const filtredContacts = this.state.contacts.filter(
      contact => contact.id !== idToDelete
    );
    this.setState({
      contacts: filtredContacts,
    });
  };

  render() {
    const contactsData = this.contactsToRender();
    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.onFormSubmit} />

        <h2>Contacts</h2>
        <Filter filter={this.state.filter} handleSearch={this.handleSearch} />
        <ContactList contacts={contactsData} toDelete={this.handleDelete} />
      </Container>
    );
  }
}

App.propTypes = {
  event: PropTypes.object,
  contactData: PropTypes.shape({
    name: PropTypes.string,
    number: PropTypes.string,
  }),
  idToDelete: PropTypes.string,
};
