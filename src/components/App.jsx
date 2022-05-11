import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
// import FormByFormik from './Formik';
import Form from './Form/Form';
import ContactList from './ContactList';
import Filter from './Filter';
import s from './App.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// export default function App() {
//   return <FormByFormik />;
// }
// кастомный хук для localStorage
const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
};

export default function App() {
  // используя isMounted проверяем замаунтился ли компонент и рендерим тоБ что localeStorage
  // const isMounted = useRef(false);
  // const [contacts, setContacts] = useState([
  //   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  // ]);
  // ленивая инециализация компонентов которая выполняется один раз
  // const [contacts, setContacts] = useState(() => {
  //   return (
  //     JSON.parse(window.localStorage.getItem('contacts')) ?? [
  //       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //     ]
  //   );
  // });
  const [contacts, setContacts] = useLocalStorage('contacts', [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const addContacts = (name, number) => {
    const newName = checkName(name);
    const formNumber = numberFormatting(number);
    const contact = {
      id: nanoid(),
      name,
      number: formNumber,
    };

    if (newName) {
      return toast.error(`${name} is already in contacts`);
    }
    setContacts(contacts => [...contacts, contact]);
    toast.success(`${name} was added to contacts!`);
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

  const checkName = name => {
    const normalyzeName = name.toLocaleLowerCase();
    return contacts.find(
      ({ name }) => name.toLocaleLowerCase() === normalyzeName
    );
  };

  const numberFormatting = number => {
    const array = [...number];
    for (let i = 3; i < array.length - 1; i += 3) {
      array.splice(i, 0, '-');
    }
    return array.join('');
  };



  const visibleContacts = getVisibleContact();

  return (
    <div className={s.container}>
      <Form onSubmit={addContacts} />
      <Filter value={filter} onChange={onChangeFilter} />
      <ContactList contacts={visibleContacts} onDeleteContact={deleteContact} />
      <ToastContainer />
      <span> Общее кол-во: {contacts.length}</span>
    </div>
  );
}


