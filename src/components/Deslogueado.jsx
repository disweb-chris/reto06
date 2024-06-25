import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";

function Deslogueado(props) {
    const [crear, setCrear] = useState(false);
    const [usuario, setUsuario] = useState("");
    const [pass, setPass] = useState("");
    const [mensaje, setMensaje] = useState("");
    const { policia, guardarUsuario, comprobarLibro } = props;
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
        signInWithEmailAndPassword(auth, usuario, pass)
        .then((userCredential) => {
            const user = userCredential.user;
            policia(user);
            comprobarPokemon(user.uid);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error en el login:", errorCode, errorMessage);
        });
    };

    const handleCrear = () => {
        createUserWithEmailAndPassword(auth, usuario, pass)
        .then((userCredential) => {
            const user = userCredential.user;
            guardarUsuario({ email: user.email, uid: user.uid });
            policia(user);
            comprobarPokemon(user.uid);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error en la creación de cuenta:", errorCode, errorMessage);
        });
    };

    const handleNoTengo = () => {
        setCrear(!crear);
    };

    const handleTexto = (e) => {
        if (e.target.name === "Usuario") {
            setUsuario(e.target.value);
        } else {
            setPass(e.target.value);
        }
    };

    return (
        <>     
            <h3>Logueate para ver mi contenido</h3>

            <input type="text" onChange={handleTexto} name="Usuario" placeholder="Usuario" />
            <input type="password" onChange={handleTexto} name="Password" placeholder="Password" />

            {!crear ? (
                <>
                    <button onClick={handleLoguin}>Login</button>
                    <p onClick={handleNoTengo}>No tengo cuenta</p>
                </>
            ) : (
                <div className="contenedorLoco">
                    <button onClick={handleCrear}>Crear cuenta</button>
                </div>
            )}

            {mensaje && <p>{mensaje}</p>}
        </>
    );
}

export default Deslogueado;
