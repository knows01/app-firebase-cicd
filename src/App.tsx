import { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [user, setUser] = useState<any>(null);

  const login = async () => {
    try {
      const u = await signInWithEmailAndPassword(auth, email, pass);
      setUser(u.user);
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <div style={{ padding: 40, fontFamily: "Arial", textAlign: "center" }}>
      <h1>Atividade SEDUC-SP – CI/CD Firebase</h1>
      {user ? (
        <>
          <p>Bem-vindo <strong>{user.email}</strong></p>
          <button onClick={() => signOut(auth).then(() => setUser(null))}>
            Sair
          </button>
        </>
      ) : (
        <>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: 10, width: 300, margin: 10 }}
          />
          <br />
          <input
            type="password"
            placeholder="Senha"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            style={{ padding: 10, width: 300, margin: 10 }}
          />
          <br />
          <button onClick={login} style={{ padding: 15, fontSize: 18 }}>
            Entrar
          </button>
        </>
      )}
    </div>
  );
}

export default App;