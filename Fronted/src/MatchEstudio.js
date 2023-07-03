import fondo from './img/matchestudio.jpeg';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './MatchCita.css';

function Cita() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/Login');
  };

  return (
    <div className="cita-fullscreen-bg">
      <img src={fondo} alt="Imagen de fondo" className="cita-fullscreen-bg__image" />

      <div className="cita-buttocontainer">
        <div className="volver-cita-buttoimage">
          <Button variant="secondary" as={Link} to="/Perfiles">
            Volver
          </Button>
        </div>
        <div className="cita-chat-buttoimage">
          <Button variant="secondary" as={Link} to="/Miperfil">
            Chat
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cita;