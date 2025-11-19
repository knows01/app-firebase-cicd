// test-firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

console.log("Executando teste automático CI/CD...");

signInWithEmailAndPassword(auth, "teste@exemplo.com", "123456")
  .then(async (cred) => {
    console.log("Login OK");
    await setDoc(doc(db, "testes", cred.user.uid), {
      data: new Date().toISOString(),
      status: "CI/CD passou",
    });
    console.log("Firestore OK");
    process.exit(0);
  })
  .catch((e) => {
    console.error("FALHOU:", e.message);
    process.exit(1);
  });