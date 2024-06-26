import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue, update, set, get } from "firebase/database";
import { initializeApp } from "firebase/app";

// Configuración de Firebase
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

// Inicialización de Firebase
const app = initializeApp(firebaseConfig); 
const db = getDatabase(app);
const auth = getAuth(app);

// Creación del Contexto
const ContextoApp = createContext();

// Proveedor del Contexto
export const ProveedorApp = ({ children }) => {
  const [pokemones, setPokemones] = useState([]);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const referencia = ref(db, 'pokemones/');
    onValue(referencia, (snapshot) => {
      const data = snapshot.val();
      setPokemones(data);
    });

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuario(user);
      } else {
        setUsuario(null);
      }
    });
  }, []);

  const agregarPokemon = () => {
    const referenciaDirecta = ref(db, '/pokemones/results');
    update(referenciaDirecta, {
      picture: "pepeloco.jpg"
    });
  };

  const guardarUsuario = (usuario) => {
    const usuarios = ref(db, 'usuarios/' + usuario.uid);
    set(usuarios, usuario);
  };

  const comprobarLibro = async () => {
    const referencia = ref(db, 'libro');
    const snapshot = await get(referencia);
    return snapshot.exists();
  };

  return (
    <ContextoApp.Provider value={{ pokemones, usuario, setUsuario, agregarPokemon, guardarUsuario, comprobarLibro }}>
      {children}
    </ContextoApp.Provider>
  );
};

// Hook para usar el contexto
export const useContextoApp = () => {
  return useContext(ContextoApp);
};
