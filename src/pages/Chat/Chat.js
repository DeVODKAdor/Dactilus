import {
  addDoc,
  collection,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import React, { useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Navbar from "../../components/navbar/Navbar";
import { db } from "../../firebase/firebase";
import { useAuth } from "../../contexts/AuthContext";
import "./Chat.css";

export default function Chat() {
  const messagesRef = collection(db, "mensagens");
  const request = query(messagesRef, orderBy("createdAt", "asc"));
  const [messages] = useCollectionData(request, { idField: "id" });
  const [formValue, setFormValue] = useState("");
  const dummy = useRef();
  const { currentUser } = useAuth();

  const ChatMessage = (props) => {
    const { text, uid } = props.message;
    const messageClass = uid === currentUser.uid ? "sent" : "received";
    return (
      <div className={`message ${messageClass}`}>
        <img className="pfp" src={currentUser.photoURL} />
        <p className="mensagem">{text}</p>
      </div>
    );
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = currentUser;
    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Navbar />
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        <div ref={dummy}></div>
      </main>
      <form onSubmit={sendMessage} className="chat-form">
        <input
          value={formValue}
          className="chat-input"
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button disabled={formValue === ""} type="submit" className="chat-button">
          Enviar
        </button>
      </form>
    </>
  );
}
