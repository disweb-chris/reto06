import React from 'react';
import contactoImg from '../assets/statics/libroProhibido.jpg';

function Contacto() {
  return (
    <div className="contacto-container">
      <div className="contacto-texto">
        <h1>Contacto</h1>
        <p>Si tienes alguna pregunta o necesitas más información sobre el libro prohibido, no dudes en contactarnos. Estamos aquí para ayudarte.</p>
        <p>Puedes enviarnos un correo a: contacto@libroprohibido.com</p>
        <p>O llamarnos al: +123 456 7890</p>
      </div>
      <div className="contacto-imagen">
        <img src={contactoImg} alt="Contacto" />
      </div>
    </div>
  );
}

export default Contacto;
