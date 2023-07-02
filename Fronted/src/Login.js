import React, { useState, useEffect } from "react";
import { Link, useNavigate} from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import axios from "axios";
import {SetEmail} from './auxiliar';
import inicioImg from './img/fondoVentanas.jpeg';
import logoImage from './img/logo.jpeg';
import './Login.css';


function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [consulta, setConsulta] = useState("");
  const navigate = useNavigate();


  const handleInputChange = (e) => {
    
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "pass") {
      setPass(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const credentials = {
      email: email,
      pass: pass,
    };
    axios
      .post("http://localhost:4000/login", credentials)
      .then((response) => {
        navigate('/Perfiles');
        SetEmail(email);
      })
      .catch((error) => {
        console.log(error);
        setConsulta("El correo o la contraseña ingresada son incorrectas")
      });
    };
    


    return (
      <div className="Login-fullscreen-bg">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand as={Link} to="/home">
            <img src={logoImage} width="30" height="30" alt="Logo" />{" "} 
            <span style={{ fontWeight: 'bold', fontStyle: 'italic' }}>StudyMatch</span>
          </Navbar.Brand>
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/Home">
                Home
              </Nav.Link>
            </Nav>
      
          </Navbar>
      <div className="login-container">
      <div className="login-form">
      <h2 style={{ fontWeight: 'bold' }}>StudyMatch</h2>
        <form onSubmit={handleSubmit}>
          <label >
            Email:
            <input
              type="email"
              name="email"
              placeholder="user@university"
              value={email}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Contraseña:
            <input
              type="password"
              name="pass"
              placeholder="****"
              value={pass}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <div>
            <p></p>
            <p></p>
          <button type="submit"> Iniciar Sesión</button> 
          <div className="forgot-password">
            <a href="/RecuperarPass">¿Olvidaste tu contraseña?</a>
          </div>
          {consulta}
          </div>
        </form>
      </div>
      <div className="background-image">
      <img src={inicioImg} alt="Imagen de fondo" className="fullscreen-bg__image" />
    </div>
    </div>
    </div>
    );
  }

export default Login;