// import { nanoid } from 'nanoid';
import React, { useState } from 'react';

// import FormByFormik from './Formik';
// import Form from './Form/Form';
// import ContactList from './ContactList';
// import Filter from './Filter';
import s from './App.module.css';

// export default function App() {
//   return <FormByFormik />;
// }

export default function App() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  // const handleNameChange = event => {
  //   setName(event.target.value);
  // };
  // const handleNumberChange = event => {
  //   setNumber(event.target.value);
  // };

  const handleChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };
  return (
    <form className={s.form} autoComplete="off">
      <label htmlFor="" className={s.label}>
        Name
        <input
          className={s.input}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label htmlFor="" className={s.label}>
        Number
        <input
          className={s.input}
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit" className={s.button}>
        Add contact
      </button>
    </form>
  );
}
// class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   addContact = ({ id, name, number }) => {
//     const contact = {
//       name,
//       number,
//       id: nanoid(),
//     };
//     this.setState(prevState => ({
//       contacts: [contact, ...prevState.contacts],
//     }));
//   };

//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   onChangeFilter = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };

//   getVisibleContact = () => {
//     const { filter, contacts } = this.state;
//     const normalizeContact = filter.toLocaleLowerCase();
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizeContact)
//     );
//   };

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parseContacts = JSON.parse(contacts);
//     if (parseContacts) {
//       this.setState({ contacts: parseContacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       console.log('щбнвилсоь поле contacts');
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   render() {
//     const visibleContacts = this.getVisibleContact();
//     return (
//       <div className={s.container}>
//         <FormByFormik onSubmit={this.addContact} />
//         {/* <Form onSubmit={this.addContact} /> */}
//         <Filter value={this.state.filter} onChange={this.onChangeFilter} />
//         <span> Общее кол-во: {this.state.contacts.length}</span>
//         <ContactList
//           contacts={visibleContacts}
//           onDeleteContact={this.deleteContact}
//         />
//       </div>
//     );
//   }
// }

// export default App;
