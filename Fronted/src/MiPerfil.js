import React, { useState , useEffect } from "react";
import { Link, useNavigate} from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import axios from "axios";
import ventanasImg from './img/fondoVentanas.jpeg';
import perfilImg from './img/fondo_study_match.jpeg';
import 'bootstrap/dist/css/bootstrap.min.css';
import logoImage from './img/logo.jpeg';
import './MiPerfil.css'
import {getEmail} from './auxiliar';


function MiPerfil() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const [email, setEmail] = useState(getEmail());

    const handleHome = () => {
      navigate('/Home');
    };

    const handleEdit = () => {
      navigate('/EditarPerfil');
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


      return (
        <div className="fullscreen-bg">
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand>
              <img src={logoImage} width="30" height="30" alt="Logo" />{" "} 
              <span style={{ fontWeight: 'bold', fontStyle: 'italic' }}>StudyMatch</span>
            </Navbar.Brand>
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/Perfiles">
                volver
              </Nav.Link>
            </Nav>
      
            <Button variant="primary" className="ms-auto" onClick={handleHome}>
              Cerrar Sesión
            </Button>
          </Navbar>

            <img src={ventanasImg} alt="Imagen de fondo" className="fullscreen-bg__image" style={{ height: '30vh' }} />

            <div className="circle-container">
                  <img src={perfilImg} alt="Imagen de fondo" className="circle-image" />
                </div>

            {usuario && (
                <div className="profile-container">
                    <h2 style={{ fontWeight: 'bold' }}>Mi Perfil</h2>
                    <div className="profile-info">
                        <p>Nombre: {usuario.nombre}</p>
                        <p>Email: {usuario.email}</p>
                        <p>Celular: {usuario.celular}</p>
                        <p>Universidad: {usuario.universidad}</p>
                        <p>Carrera: {usuario.carrera}</p>
                        <p>Sexo: {usuario.sexo}</p>
                        <p>Descripción: {usuario.descripcion}</p>
                    </div>
                </div>
            )}
            <div className="edit-profile-button">
                <Button variant="secondary" className="ml-auto" onClick={handleEdit}>
                  Editar Perfil
                </Button>
            </div>
      </div>
      );
  };

export default MiPerfil;