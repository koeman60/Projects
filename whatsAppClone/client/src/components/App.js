// import "./App.css";
import Login from "./Login";
import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import DashBoard from "./DashBoard";
import { ContactsProvider } from "../contacts/ContactsProvider";
import { ConversationsProvider } from "../contacts/ConversationsProvider";
import { SocketProvider } from "../contacts/SocketProvider";

function App() {
  const [id, setId] = useLocalStorage("id");

  const dashBoard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <DashBoard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  );

  return id ? dashBoard : <Login onIdSubmit={setId} />;
}
export default App;
