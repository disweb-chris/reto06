import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";
import { useContextoApp } from '../context/AppContext';

function Deslogueado() {
  const [crear, setCrear] = useState(false);
  const [usuarioInput, setUsuarioInput] = useState("");
  const [pass, setPass] = useState("");
  const [mensaje, setMensaje] = useState("");
  const { setUsuario, guardarUsuario, comprobarLibro } = useContextoApp();
  const auth = getAuth();
  const db = getDatabase();

  const comprobarPokemon = async (uid) => {
    try {
      console.log("Comprobando Pokémon para UID:", uid);
      const usuarioRef = ref(db, 'usuarios/' + uid);
      const snapshot = await get(usuarioRef);
      const data = snapshot.val();
      console.log("Datos del usuario:", data);

      if (data && data.pokemon === true) {
        setMensaje("Tienes un pokemon");
      } else {
        setMensaje("Tienes que comprar pokemones");
      }
    } catch (error) {
      console.error("Error comprobando Pokémon:", error);
      setMensaje("Error al comprobar Pokémon");
    }
  };

  const handleLoguin = () => {
    signInWithEmailAndPassword(auth, usuarioInput, pass)
      .then((userCredential) => {
        const user = userCredential.user;
        setUsuario(user);
        comprobarPokemon(user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error en el login:", errorCode, errorMessage);
        setMensaje(`Error en el login: ${errorMessage}`);
      });
  };

  const handleCrear = () => {
    createUserWithEmailAndPassword(auth, usuarioInput, pass)
      .then((userCredential) => {
        const user = userCredential.user;
        guardarUsuario({ email: user.email, uid: user.uid });
        setUsuario(user);
        comprobarPokemon(user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error en la creación de cuenta:", errorCode, errorMessage);
        setMensaje(`Error en la creación de cuenta: ${errorMessage}`);
      });
  };

  const handleNoTengo = () => {
    setCrear(!crear);
  };

  const handleTexto = (e) => {
    if (e.target.name === "Usuario") {
      setUsuarioInput(e.target.value);
    } else {
      setPass(e.target.value);
    }
  };

  return (
    <>
      <h3>Logueate para leer LA VERDAD</h3>
      <form>
        <input type="text" onChange={handleTexto} name="Usuario" placeholder="Usuario" />
        <input type="password" onChange={handleTexto} name="Password" placeholder="Password" />
        {!crear ? (
          <>
            <button type="button" onClick={handleLoguin}>Login</button>
            <p onClick={handleNoTengo}>No tengo cuenta</p>
          </>
        ) : (
          <div className="contenedorLoco">
            <button type="button" onClick={handleCrear}>Crear cuenta</button>
          </div>
        )}
      </form>
      {mensaje && <p>{mensaje}</p>}
    </>
  );
}

export default Deslogueado;
