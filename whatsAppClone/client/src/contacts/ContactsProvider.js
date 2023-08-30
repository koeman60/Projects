import React, { useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const contactsContext = React.createContext();

export function useContacts() {
  return useContext(contactsContext);
}

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useLocalStorage("contacts", []);

  function createContact(number, name) {
    setContacts((prevContacts) => {
      return [...prevContacts, { number, name }];
    });
  }

  return (
    <contactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </contactsContext.Provider>
  );
}
