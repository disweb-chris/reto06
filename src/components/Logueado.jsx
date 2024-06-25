import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from 'react'
import { getDatabase, ref, get } from "firebase/database";

function Logueado(props) {

    const {policia, usuario, comprobarLibro} = props
    const [libroExiste, setLibroExiste] = useState(null);


    useEffect(() => {
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
    }, [usuario]);

    const desloguear = (props)=> {
        const auth = getAuth();
        signOut(auth).then(() => {
            policia(false)
        }).catch((error) => {
          // An error happened.
        });
      
    }

    return ( 
        <>
            <h1>Hola {usuario.email}</h1>
            <h3>Estas logueado</h3>

            {libroExiste === null ? (
                <p>Cargando...</p>
            ) : libroExiste ? (
                <img src="https://agencyimagine.com/wp-content/uploads/2024/04/satelite-1.png" alt="Imagen del libro" />
            ) : (
                <p>Tienes que comprar el libro</p>
            )}

            <button onClick={desloguear}>Desloguear</button>
        </>
     );
}

export default Logueado;