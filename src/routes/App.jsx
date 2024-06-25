import { useEffect, useState } from 'react'
import '../assets/styles/App.css'
import Logueado from '../components/Logueado';
import Deslogueado from '../components/Deslogueado';
import { AuthProvider, useAuth } from '../context/Contexto';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue, onChildAdded, set, push, update, onChildChanged, onChildRemoved, onChildMoved, get } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD74P3jnhQwj5cY0I8xCjpSiaJ8B3wCGVA",
  authDomain: "easterhack2024.firebaseapp.com",
  databaseURL: "https://easterhack2024-default-rtdb.firebaseio.com",
  projectId: "easterhack2024",
  storageBucket: "easterhack2024.appspot.com",
  messagingSenderId: "259448643640",
  appId: "1:259448643640:web:a1daca2a76b9655d1346cd",
  measurementId: "G-BLE7CRP839"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
const analytics = getAnalytics(app);

function App() {

  const [pokemones, setPokemones] = useState([])

  const [log, setLog] = useState(false)

  const db = getDatabase();

  const referenciaDirecta = ref(db, '/pokemones/results');

  useEffect(()=> {
    const referencia = ref(db, 'pokemones/');

    onValue(referencia, (snapshot) => {
    const data = snapshot.val();
      setPokemones(data)
     // console.log("Pokemones desde UsseEffec", data)
  });


    onChildAdded(referenciaDirecta, (snapshot) => {
      const data = snapshot.val();
        //setPokemones(data)
        //console.log("Pokemones desde OnChildAdded", data)
    });

    onChildChanged(referenciaDirecta, (snapshot) => {
      const data = snapshot.val();
        //setPokemones(data)
        //console.log("Pokemones desde onChildChanged", data)
    });

    onChildRemoved(referenciaDirecta, (snapshot) => {
      const data = snapshot.val();
        //setPokemones(data)
        //console.log("Pokemones desde onChildRemoved", data)
    });

    onChildMoved(referenciaDirecta, (snapshot) => {
      const data = snapshot.val();
        //setPokemones(data)
        //console.log("Pokemones desde onChildMoved", data)
    });
  },[])

  const agregar = () => {
   
      update (referenciaDirecta, {
        picture: "pepeloco.jpg"
      });
  }

  const guardarUsuario = (usuario) => {

    const usuarios = ref(db, 'usuarios/' + usuario.uid);
    set(usuarios, usuario);
  }

  const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        setLog(user)
        // ...
      } else {
        // User is signed out
        // ...
        setLog(false)
      }
    });

    const comprobarLibro = async () => {
      const referencia = ref(db, 'libro');
      const snapshot = await get(referencia);
      return snapshot.exists();
    };
  

  return (
    <>
      <h1>Hola desde la clase de Firebase</h1>
      <h2>{pokemones?.name}</h2>
      {!log ? <Deslogueado policia={setLog} guardarUsuario={guardarUsuario} comprobarLibro={comprobarLibro}></Deslogueado> : <Logueado policia={setLog} usuario={log} comprobarLibro={comprobarLibro}></Logueado> }
    </>
  )
}

export default App
