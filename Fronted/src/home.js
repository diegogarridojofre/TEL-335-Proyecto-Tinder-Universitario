import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import inicioImg from './img/inicioStudyMatch.jpeg';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import logoImage from './img/logo.jpeg';
import { Navbar, Nav } from 'react-bootstrap';

function Home() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/Login');
  };

  return (
    <div className="fullscreen-bg">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          <img src={logoImage} width="30" height="30" alt="Logo" />{" "} 
          <span style={{ fontWeight: 'bold', fontStyle: 'italic' }}>StudyMatch</span>
        </Navbar.Brand>
        <Nav>
          <Nav.Link as={Link} to="/Register">
            Contacto
          </Nav.Link>
        </Nav>
        <Button variant="primary" className="ms-auto" onClick={handleLogin}>
          Iniciar Sesión
        </Button>
      </Navbar>

      <img src={inicioImg} alt="Imagen de fondo" className="fullscreen-bg__image" />
      <div className="position-absolute bottom-0 start-0 p-3">
        <div className="bg-white p-3">
          <p className="text-dark" style={{ fontSize: '24px' }}>
            Si eres nuevo{' '}
            <Button variant="secondary" as={Link} to="/Register">
              Crear cuenta
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;