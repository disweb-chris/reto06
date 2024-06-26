import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from 'react'
import { getDatabase, ref, get } from "firebase/database";
import { useContextoApp } from '../context/AppContext';

function Logueado() {
  const { setUsuario, usuario, comprobarLibro } = useContextoApp();
  const [libroExiste, setLibroExiste] = useState(null);

  useEffect(() => {
    if (usuario) {
      const verificarLibro = async () => {
        const db = getDatabase();
        const libroRef = ref(db, 'usuarios/' + usuario.uid + '/libro');
        const snapshot = await get(libroRef);
        if (snapshot.exists()) {
          setLibroExiste(snapshot.val());
        } else {
          setLibroExiste(false);
        }
      };
      verificarLibro();
    }
  }, [usuario]);

  const desloguear = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      setUsuario(null);
    }).catch((error) => {
      console.error("Error al desloguear:", error);
    });
  }

  if (!usuario) {
    return <p>Cargando usuario...</p>;
  }

  return (
    <main>
      <h1>Hola {usuario.email}</h1>
      <h3>Estás logueado</h3>

      {libroExiste === null ? (
        <p>Cargando...</p>
      ) : libroExiste ? (
        <img src="https://agencyimagine.com/wp-content/uploads/2024/04/satelite-1.png" alt="Imagen del libro" />
      ) : (
        <p>Tienes que comprar el libro para saber LA VERDAD</p>
      )}

      <button onClick={desloguear}>Desloguear</button>
    </main>
  );
}

export default Logueado;
