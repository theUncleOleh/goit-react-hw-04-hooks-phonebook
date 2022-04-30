import React, { useState } from 'react';
import { nanoid } from 'nanoid';
// import FormByFormik from './Formik';
import Form from './Form/Form';
import ContactList from './ContactList';
import Filter from './Filter';
import s from './App.module.css';

// export default function App() {
//   return <FormByFormik />;
// }

export default function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const addContacts = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    return setContacts(contacts => [...contacts, contact]);
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const onChangeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContact = () => {
    const normalizeContact = filter.toLocaleLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeContact)
    );
  };

  const visibleContacts = getVisibleContact();

  return (
    <div className={s.container}>
      <Form onSubmit={addContacts} />
      <ContactList contacts={visibleContacts} onDeleteContact={deleteContact} />
      <Filter value={filter} onChange={onChangeFilter} />
      <span> Общее кол-во: {contacts.length}</span>
    </div>
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
