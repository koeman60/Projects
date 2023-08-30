import React from "react";
import OpenConversation from "./OpenConversation";
import SideBar from "./SideBar";
import { useConversations } from "../contacts/ConversationsProvider";

export default function DashBoard({ id }) {
  const { selectedConversation } = useConversations();

  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <SideBar id={id} />
      {selectedConversation && <OpenConversation />}
    </div>
  );
}
