import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

const App = () => {
  const savedContacts = JSON.parse(localStorage.getItem('contacts'));

  const [contacts, setContacts] = useState(savedContacts);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleChange = event => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const addContact = () => {
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
    setContacts([...contacts, newContact]);
    setName('');
    setNumber('');
  };

  const handleFilterChange = event => {
    setFilter(event.target.value.toLowerCase());
  };

  const deleteContact = idToDelete => {
    const updatedContacts = contacts.filter(
      contact => contact.id !== idToDelete
    );
    setContacts(updatedContacts);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );

  return (
    <div className="app-container">
      <h1>Phonebook</h1>
      <ContactForm
        name={name}
        number={number}
        onChange={handleChange}
        addContact={addContact}
      />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
    </div>
  );
};

export { App };
