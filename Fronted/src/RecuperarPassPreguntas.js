import React, { useState, useEffect } from "react";
import { Button, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import axios from "axios";
import ventanasImg from './img/fondoVentanas.jpeg';
import 'bootstrap/dist/css/bootstrap.min.css';
import logoImage from './img/logo.jpeg';
import './MiPerfil.css'
import './EditPerfil.css'
import './RecuperarPassPregunta.css'
import { getEmail } from './auxiliar';


function RecuperarPassPreguntas() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [email, setEmail] = useState(getEmail);

  const [pass, setPass] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleCloseSesion = () => {
    navigate('/Home');
  };

  useEffect(() => {
    axios.get(`http://localhost:4000/miperfil/${email}`)
      .then((response) => {
        setUsuario(response.data);
      })
      .catch((error) => {
        console.log(error);
        // Manejar el error, como mostrar un mensaje de error
      });
  }, []);

  const handleGuardarCambios = () => {
    const updatedData = {
      pass: pass || usuario.pass // Si el campo está vacío, se conserva el valor anterior
    };

    axios.put(`http://localhost:4000/changepass/${email}`, updatedData)
      .then((response) => {
        console.log(response.data);
        navigate('/Login');
        // Manejar la respuesta exitosa, como mostrar un mensaje de éxito
      })
      .catch((error) => {
        console.log(error);
        // Manejar el error, como mostrar un mensaje de error
      });
  };

  const handleRespuestaSeguridad = () => {
    if (respuesta === usuario.respuestaseg) {
      setShowModal(true);
    } else {
      // Mostrar un mensaje de error o realizar alguna acción
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="fullscreen-bg-rec-preguntas">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          <img src={logoImage} width="30" height="30" alt="Logo" />{" "} 
          <span style={{ fontWeight: 'bold', fontStyle: 'italic' }}>StudyMatch</span>
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/Login">
            volver
          </Nav.Link>
        </Nav>

        <Button variant="primary" className="ms-auto" onClick={handleCloseSesion}>
          Cerrar Sesión
        </Button>
      </Navbar>

      <img src={ventanasImg} alt="Imagen de fondo" className="fullscreen-bg__image-rec-preguntas" />
      {usuario && (
        <div className="rec-pregunta-container">
          <h2 style={{ fontWeight: 'bold' }}>Pregunta de seguridad</h2>
          <div className="rec-preg-info">
            <label>
              {usuario.preguntaseg}
              <input
                type="text"
                name="respuesta"
                placeholder="****"
                value={respuesta}
                onChange={(e) => setRespuesta(e.target.value)}
              />
              <p></p>
            </label>
            <div className="button-container-rec-preg">
              <Button onClick={handleRespuestaSeguridad}>Enviar</Button>
            </div>
          </div>
        </div>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Cambiar Contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>
            Nueva Contraseña:
            <input
              type="password"
              name="pass"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </label>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleGuardarCambios}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default RecuperarPassPreguntas;
