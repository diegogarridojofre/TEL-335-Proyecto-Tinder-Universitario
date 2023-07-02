import React, { useState , useEffect } from "react";
import { Button } from 'react-bootstrap';
import { Link, useNavigate} from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import axios from "axios";
import ventanasImg from './img/fondoVentanas.jpeg';
import 'bootstrap/dist/css/bootstrap.min.css';
import logoImage from './img/logo.jpeg';
import './EditPerfil.css'


import {getEmail} from './auxiliar';

function EditarPerfil() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const [email, setEmail] = useState(getEmail);

    const [nombre, setNombre] = useState('');
    const [pass, setPass] = useState('');
    const [celular, setCelular] = useState('');
    const [universidad, setUniversidad] = useState('');
    const [carrera, setCarrera] = useState('');
    const [sexo, setSexo] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const handleLogin = () => {
      navigate('/home');
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
          nombre: nombre || usuario.nombre, // Si el campo está vacío, se conserva el valor anterior
          pass: pass || usuario.pass,
          celular: celular || usuario.celular,
          universidad: universidad || usuario.universidad,
          carrera: carrera || usuario.carrera,
          sexo: sexo || usuario.sexo, // No se actualiza el campo de sexo en esta función
          descripcion: descripcion || usuario.descripcion,
        };
      
        axios.put(`http://localhost:4000/editarperfil/${email}`, updatedData)
          .then((response) => {
            console.log(response.data);
            navigate('/MiPerfil');
            // Manejar la respuesta exitosa, como mostrar un mensaje de éxito
          })
          .catch((error) => {
            console.log(error);
            // Manejar el error, como mostrar un mensaje de error
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
                cancelar
              </Nav.Link>
            </Nav>

            <Button variant="primary" className="ms-auto" onClick={handleLogin}>
              Cerrar Sesión
            </Button>
          </Navbar>

            <img src={ventanasImg} alt="Imagen de fondo" className="fullscreen-bg__image-edit"/>
            <div className="circle-container-edit">
                <img src={ventanasImg} alt="Imagen de fondo" className="circle-image-edit" />
            </div>

            {usuario && (
        <div className="profile-container-edit">
          <h2 style={{ fontWeight: 'bold' }}> Mi Perfil</h2>
          <div className="form-container">
            <div className="column">
              <label htmlFor="idInput">Nombre:</label>
              <input
                type="text"
                id="idInput"
                value={nombre}
                placeholder={usuario.nombre}
                onChange={(e) => setNombre(e.target.value)}
              />

              <label htmlFor="passInput">Clave:</label>
              <input
                type="password"
                id="passInput"
                value={pass}
                placeholder={usuario.pass}
                onChange={(e) => setPass(e.target.value)}
              />
              <label htmlFor="celularInput">Celular:</label>
              <input
                type="text"
                id="celularInput"
                value={celular}
                placeholder={usuario.celular}
                pattern="\+569\d{8}"
                onChange={(e) => setCelular(e.target.value)}
              />
            </div>

            <div className="column">
              <label htmlFor="universidadInput">Universidad:</label>
              <select onChange={(e) => setUniversidad(e.target.value)} name="universidad" value={universidad}>
                <option value="Universidad Técnica Federico Santa Maria">Universidad Técnica Federico Santa Maria</option>
              </select>

              <label htmlFor="carreraInput">Carrera:</label>
              <input
                type="text"
                id="carreraInput"
                value={carrera}
                placeholder={usuario.carrera}
                onChange={(e) => setCarrera(e.target.value)}
              />

              <label htmlFor="acercadetiInput">Acerca de ti:</label>
              <input
                id="acercadetiInput"
                type="text"
                value={descripcion}
                placeholder={usuario.descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
              <p></p>
              <label>Sexo:</label>
              <select onChange={(e) => setSexo(e.target.value)} name="sexo" value={sexo}>
                <option value=""></option>
                <option value="hombre">Hombre</option>
                <option value="mujer">Mujer</option>
                <option value="otro">Otro</option>
              </select>
            </div>
          </div>

          <div className="button-container-edit">
            <Button variant="primary" onClick={handleGuardarCambios}>
              Guardar Cambios
            </Button>
          </div>
        </div>
      )}

            

            
      
        </div>
    );
  };

  


export default EditarPerfil;