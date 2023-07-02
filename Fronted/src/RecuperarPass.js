import React, { useState , useEffect } from "react";
import { Link, useNavigate} from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import axios from "axios";
import inicioImg from './img/fondoVentanas.jpeg';
import logoImage from './img/logo.jpeg';
import './Login.css';
import './RecuperarPass.css';
import {SetEmail} from './auxiliar';

function RecuperarPass() {
  const [usuario, setUsuario] = useState(null);
  const [email, setEmail] = useState("");
  const [consulta, setConsulta] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
      SetEmail(value)
      
    }
  };

  const handleSubmit = (e) => {
        e.preventDefault(); //cancela la función de envió de formulario
    
        axios.get(`http://localhost:4000/recuperarpass/${email}`)
          .then((response) => {
            setUsuario(response.data);
            navigate("/RecuperarPassPreguntas")
            
          })
          .catch((error) => {
            console.log(error);
            setConsulta("No existe una cuenta con el correo ingresado")
          });
     
    // Realiza las acciones necesarias para recuperar la contraseña con las credenciales proporcionadas
  };

 

  return (
    <div className="fullscreen-bg-recuperar">
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
      </Navbar>


      <div className="recuperar-container">
        <div className="recuperar-form">
          <h2 style={{ fontWeight: 'bold' }}>Recuperar Contraseña</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Email:
              <input
                type="email"
                name="email"
                placeholder="user@university"
                value={email}
                onChange={handleInputChange}
              />
              
            </label>
            <p></p>
            <div>
              <button type="submit">Recuperar</button>
            </div>
            <p>{consulta}</p>
          </form>
        </div>
        <div className="background-image-recuperar">
          <img src={inicioImg} alt="Imagen de fondo" className="fullscreen-bg__image-recuperar" />
        </div>
      </div>
    </div>
  );
}

export default RecuperarPass;
