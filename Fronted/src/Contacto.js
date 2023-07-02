import React from "react";
import { Modal } from 'react-bootstrap';
import inicioImg from './img/fondoVentanas.jpeg';
import logoImage from './img/logo.jpeg';
import './Contacto.css';

function ContactoEquipo() {
  return (
    <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>Contacto del Equipo StudyMatch</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="fullscreen-bg">
          <div className="fullscreen-bg__image" style={{ backgroundImage: `url(${inicioImg})` }}></div>
          <div className="content">
            <h3>Información de Contacto</h3>
            <p>Correo: contactostudymatch@gmail.com</p>
            <p>Integrantes del Equipo:</p>
            <ul>
              <li>Sofia Rojas Ciudad</li>
              <li>Diego Garrido Jofré</li>
              <li>Clemente Aranguiz</li>
              <li>Giovanni Camilo</li>
            </ul>
          </div>
        </div>
      </Modal.Body>
    </Modal.Dialog>
  );
}

export default ContactoEquipo;
