import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    name: '',
    number: '',
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');

    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;

    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  addContact = () => {
    const { name, number, contacts } = this.state;

    //sprawdzam w ten sposób czy wprowadzona w pierwszym inpucie nazwa już istnieje w tablicy kontaktów. Jeśli tak - notiflix.warning i kończymy temat:)
    const isNameExists = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isNameExists) {
      Notify.warning(`${name} already exists in contacts.`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    this.setState({
      contacts: [...contacts, newContact],
      name: '',
      number: '',
    });
  };

  handleFilterChange = event => {
    this.setState({ filter: event.target.value.toLowerCase() });
  };

  deleteContact = idToDelete => {
    const updatedContacts = this.state.contacts.filter(
      contact => contact.id !== idToDelete
    );
    this.setState({ contacts: updatedContacts });
  };

  render() {
    const { contacts, filter } = this.state;

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );

    return (
      <div className="app-container">
        <h1>Phonebook</h1>
        <ContactForm
          name={this.state.name}
          number={this.state.number}
          onChange={this.handleChange}
          addContact={this.addContact}
        />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.handleFilterChange} />
        <ContactList
          contacts={filteredContacts}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export { App };
