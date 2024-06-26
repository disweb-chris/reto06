import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Logueado from '../components/Logueado';
import Deslogueado from '../components/Deslogueado';
import Contacto from '../components/Contacto';
import Layout from '../components/Layout';
import { useContextoApp } from '../context/AppContext';
import libroProhibido from '../assets/statics/libroProhibido.jpg';

function App() {
  const { usuario } = useContextoApp();

  return (
    <Router>
      <Layout>
        <div className="container">
          <h1>Ingresa a LA VERDAD</h1>
          <img src={libroProhibido} alt="Libro Prohibido" />
          <p>Bienvenido a la aplicación para obtener el misterioso libro prohibido, donde leeras LA VERDAD. Por favor, inicia sesión o crea una cuenta para acceder a este contenido exclusivo.</p>
          <Routes>
            <Route path="/" element={!usuario ? <Deslogueado /> : <Logueado />} />
            <Route path="/contacto" element={<Contacto />} />
          </Routes>
        </div>
      </Layout>
    </Router>
  );
}

export default App;
