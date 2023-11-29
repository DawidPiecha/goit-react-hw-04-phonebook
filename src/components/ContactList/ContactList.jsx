import PropTypes from 'prop-types';
import css from './ContactList.module.css';

const ContactList = ({ contacts, deleteContact }) => (
  <ul className={contacts.length ? css.contactList : css.emptyList}>
    {contacts.map(contact => (
      <li key={contact.id} className={css.contactList__item}>
        {contact.name}: {contact.number}
        <button
          type="button"
          className={css.deleteButton}
          onClick={() => deleteContact(contact.id)}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);
ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteContact: PropTypes.func.isRequired,
};
export { ContactList };
