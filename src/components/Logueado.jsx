import { getAuth, signOut } from "firebase/auth";

function Logueado(props) {

    const {policia, usuario} = props

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
            <h3>Estas logueado. Accedes al contenido premium</h3>
            <button onClick={desloguear}>Desloguear</button>
        </>
     );
}

export default Logueado;