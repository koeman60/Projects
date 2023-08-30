import React from "react";
import { ListGroup } from "react-bootstrap";
import { useContacts } from "../contacts/ContactsProvider";

export default function Contacts() {
  const { contacts } = useContacts();
  // function shownumber(e) {
  //   const target = e.target;
  //   console.log(target);
  // const numbers = document.getElementsByClassName('shownumber')
  // }

  return (
    <ListGroup variant="flush">
      {contacts.map((contact) => (
        <ListGroup.Item
          // ClassName="shownumber"
          // onClick={() => shownumber()}
          // id={contact.number}
          key={contact.number}
        >
          {contact.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
