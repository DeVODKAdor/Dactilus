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
import { Divider, IconButton, TextField } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import VLibras from "@djpfs/react-vlibras";
import "./Chat.css";

export default function Chat() {
  const messagesRef = collection(db, "mensagens");
  const usersRef = collection(db, "online");
  const request = query(messagesRef, orderBy("createdAt", "asc"));
  const usersRequest = query(usersRef, orderBy("user", "asc"));
  const [messages] = useCollectionData(request, { idField: "id" });
  const [users] = useCollectionData(usersRequest, { idField: "id" });
  const [formValue, setFormValue] = useState("");
  const dummy = useRef();
  const { currentUser } = useAuth();

  const ChatMessage = (props) => {
    const { text, uid, photoURL } = props.message;
    const messageClass = uid === currentUser.uid ? "sent" : "received";
    return (
      <div className={`message ${messageClass}`}>
        <img className="pfp" src={photoURL} />
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
      <div className="container">
        <main>
          {messages &&
            messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
          <div ref={dummy}></div>
        </main>
        <form onSubmit={sendMessage} className="chat-form mb-3">
          <TextField
            className="campo-mensagem"
            id="outlined-flexible"
            label="Mensagem"
            fullWidth
            maxRows={4}
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
          />
          <IconButton type="submit">
            <SendRoundedIcon />
          </IconButton>
        </form>
      </div>
      <VLibras />
    </>
  );
}
