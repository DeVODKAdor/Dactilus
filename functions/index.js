import functions from "firebase-functions";
import { initializeApp } from "firebase/app";

import Filter from "bad-words";
import admin from "firebase-admin";
import { getFirestore } from "firebase/firestore";

initializeApp(admin);

const db = getFirestore(admin);

export const detectEvilUsers = functions.firestore
  .document("mensagens/{msgId}")
  .onCreate(async (doc, ctx) => {
    const filter = new Filter();
    const {text, uid} = doc.data()
    if (filter.isProfane(text)) {
        const cleaned = filter.clean(text)
        await doc.ref.update({text: `Fui banido permanentemente por dizer: ${cleaned}`})
        await db.collection("banned").doc(uid).set({})
    }
  });
