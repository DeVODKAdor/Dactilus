import { collection, FieldValue, orderBy } from "firebase/firestore";
import React, { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Navbar from "../../components/navbar/Navbar";
import { db } from "../../firebase/firebase";
import { useAuth } from "../../contexts/AuthContext";

export default function Chat() {
  const messagesRef = collection(db, "mensagens");
  const query = orderBy("createdAt")
  const [messages] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState("");
  const { currentUser } = useAuth();

  const ChatMessage = props => {
    const { text, uid } = props.message;
    const messageClass = uid === currentUser.uid ? "sent" : "received";
    return (
      <div className={`message ${messageClass}`}>
        <img src={currentUser.photoURL} />
        <p>{text}</p>
      </div>
    );
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = currentUser;
    await messagesRef.add({
      text: formValue,
      data: FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue("");
  };

  
  return (
    <>
      <Navbar />
      <div>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
      </div>
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </>
  );
}
