import React, { useState, useEffect } from "react";
import {  Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ventanasImg from './img/fondoVentanas.jpeg';
import 'bootstrap/dist/css/bootstrap.min.css';
import logoImage from './img/logo.jpeg';
import perfilImg from './img/fondo_study_match.jpeg';
import { Navbar, Nav } from 'react-bootstrap';
import axios from "axios";
import './App.css';
import './Perfiles.css';
import { getEmail } from './auxiliar';

function Perfiles() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");  const [usuarios, setUsuarios] = useState([]);
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [usuarioIndex, setUsuarioIndex] = useState(0);
  const [Cita, setCita] = useState(null);
  const [usuariosMostrados, setUsuariosMostrados] = useState([]);



  useEffect(() => {
    setEmail(getEmail());

  }, []);

  const handleLogin = () => {
    navigate('/home');
  };

  useEffect(() => {
    axios.get(`http://localhost:4000/usuarios?email=${email}`)
    .then((response) => {
        const usuariosData = response.data;
        setUsuarios(usuariosData);
        setUsuarioIndex(0); // Actualizar el índice a 0
        setUsuarioActual(usuariosData[0]);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [email]);
  


  const handleNextUser = () => {
    let newIndex = (usuarioIndex + 1) % usuarios.length;
    setUsuarioIndex(newIndex);
    setUsuarioActual(usuarios[newIndex] || null);
  };

  const handlePreviousUser = () => {
    let newIndex = usuarioIndex === 0 ? usuarios.length - 1 : usuarioIndex - 1;
    setUsuarioIndex(newIndex);
    setUsuarioActual(usuarios[newIndex] || null);
  };


  const cita = (e) => {
    e.preventDefault();
    const newCita = {
      emailprimero: email,
      emailsegundo: usuarioActual.email
    };
    handleNextUser();
    axios.post("http://localhost:4000/Perfiles/cita", newCita)
    .then((response) => {
      if (response.data === "match") {
        setCita("match");
        navigate("/MatchCita")
      }
      
    })
      .catch((error) => {
        console.log(error);
      });
  };

  
  const estudio = (e) => {
    e.preventDefault();
    const newstudy= {
      emailprimero: email,
      emailsegundo: usuarioActual.email
    };
    handleNextUser();
    axios.post("http://localhost:4000/Perfiles/estudio", newstudy)
    .then((response) => {
      if (response.data === "estudio") {
        navigate("/MatchEstudio")
      }
      
    })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <div className="fullscreen-bg">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          <img src={logoImage} width="30" height="30" alt="Logo" />{" "} 
          <span style={{ fontWeight: 'bold', fontStyle: 'italic' }}>StudyMatch</span>
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/MiPerfil">
            Mi Perfil
          </Nav.Link>
        </Nav>
        <Button variant="primary" className="ms-auto" onClick={handleLogin}>
          Cerrar Sesión
        </Button>
      </Navbar>
      <img src={ventanasImg} alt="Imagen de fondo" className="fullscreen-bg__image" style={{ height: '30vh' }} />

      <div className="circle-container">
        <img src={perfilImg} alt="Imagen de fondo" className="circle-image" />
      </div>

      {usuarioActual && (
        <div className="profile-container">
          <h2 style={{ fontWeight: 'bold' }}><p>{usuarioActual.nombre}</p></h2>
          <div className="profile-info">
            <p>Universidad: {usuarioActual.universidad}</p>
            <p>Carrera: {usuarioActual.carrera}</p>
            <p>Sexo: {usuarioActual.sexo}</p>
            <p>Descripción: {usuarioActual.descripcion}</p>
          </div>
        </div>
      )}

      <div className="button-container">
        <div className="button-image" onClick={handlePreviousUser}>
          <img src={require('./img/flechaprevious.jpeg')} alt="Botón Anterior" />
        </div>
        <div className="button-image" onClick={handleNextUser}>
          <img src={require('./img/flechanext.jpeg')} alt="Botón Siguiente" />
        </div>
      </div>

      <div className="buttoncontainer">
        <div className="buttonimage" onClick={cita}>
          <img src={require('./img/cita.jpeg')} alt="cita" />
        </div>
        <div className="buttonimage" onClick={estudio}>
          <img src={require('./img/estudio.jpeg')} alt="estudio" />
        </div>
      </div>
    </div>
  );
}

export default Perfiles;