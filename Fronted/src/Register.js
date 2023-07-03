import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import inicioImg from './img/fondoVentanas.jpeg';
import logoImage from './img/logo.jpeg';
import {SetEmail} from './auxiliar';
import './Registro.css'

function Register() {
  const [nombre, setNombre] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [universidad, setUniversidad] = useState("Universidad Técnica Federico Santa Maria");
  const [carrera, setCarrera] = useState("");
  const [birthday, setBirthday] = useState("");
  const [sexo, setSexo] = useState("Hombre");
  const [descripcion, setDescripcion] = useState("");
  const [preguntaSeg, setPreguntaSeg] = useState("¿Cuál es el nombre de tu primera mascota?");
  const [respuestaSeg, setRespuestaSeg] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "nombre") {
      setNombre(value);
    } else if (name === "pass") {
      setPass(value);
    } else if (name === "email") {
      setEmail(value);
      SetEmail(value);
    } else if (name === "celular") {
      setCelular(value);
    } else if (name === "universidad") {
      setUniversidad(value);
    } else if (name === "carrera") {
      setCarrera(value);
    } else if (name === "birthday") {
      setBirthday(value);
    } else if (name === "sexo") {
      setSexo(value);
    } else if (name === "descripcion") {
      setDescripcion(value);
    } else if (name === "questionSec") {
      setPreguntaSeg(value);
    } else if (name === "respuestaSeg") {
      setRespuestaSeg(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      nombre: nombre,
      pass: pass,
      email: email,
      celular: celular,
      universidad: universidad,
      carrera: carrera,
      birthday: birthday,
      sexo: sexo,
      descripcion: descripcion,
      preguntaSeg: preguntaSeg,
      respuestaSeg: respuestaSeg,
      
    };
    axios
      .post("http://localhost:4000/register", newUser)
      .then((response) => {
        console.log(response.data);
        navigate('/UploadImage');
        // Hacer algo con la respuesta, como mostrar un mensaje de éxito
      })
      .catch((error) => {
        console.log(error);
        // Manejar el error, como mostrar un mensaje de error
      });
  };

  return (
    <div className="register-fullscreen-bg">
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
      <div className="register-container">
      <div className="register-form">
      <h2 style={{ fontWeight: 'bold' }}>Crea tu cuenta</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
            <input
              type="text"
              name="nombre"
              placeholder="Ingresa tu nombre"
              value={nombre}
              onChange={handleInputChange}
            />
        </label>
        
        <label>
          email:
            <input
              type="email"
              name="email"
              placeholder="user@university"
              value={email}
              onChange={handleInputChange}
            />
        </label>
        
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
        
        <label>
          Celular:
            <input
              type="text"
              placeholder="+569"
              name="celular"
              pattern="\+569\d{8}"
              value={celular}
              onChange={handleInputChange}
            />
        </label>
        
        <label>
          Universidad:
          <select onChange={handleInputChange} name="universidad" value={universidad}>   
              <option value="Universidad Técnica Federico Santa Maria">Universidad Técnica Federico Santa Maria</option>
            </select>
        </label>
        
        <label>
          Carrera:
            <input
              type="text"
              name="carrera"
              placeholder="Estudiando la carrera de: "
              value={carrera}
              onChange={handleInputChange}
            />
        </label>
        
        <label>
          Fecha de Nacimiento:
            <input
              type="date"
              name="birthday"
              value={birthday}
              onChange={handleInputChange}
            />
        </label>
        
        <label>
          Sexo:
            <select onChange={handleInputChange} name="sexo" value={sexo}>   
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
              <option value="Otro">Otro</option>
            </select>
        </label>
        
        <label>
          Acerca de ti:
            <input
              type="text"
              name="descripcion"
              placeholder="Cuentanos sobre ti"
              value={descripcion}
              onChange={handleInputChange}
            />
        </label>
        
        <label>
          Seleccione una pregunta de seguridad:
            <select onChange={handleInputChange} name="questionSec" value={preguntaSeg}>   
              <option value="¿Cuál es el nombre de tu primera mascota?">¿Cuál es el nombre de tu primera mascota?</option>
              <option value="¿Cuál es el nombre de tu mejor amigo/a de la infancia?">¿Cuál es el nombre de tu mejor amigo/a de la infancia?</option>
              <option value="¿Cuál es tu canción favorita?">¿Cuál es tu canción favorita?</option>
            </select>
        </label>

        <label>
          Respuesta de seguridad:
            <input
              type="text"
              name="respuestaSeg"
              placeholder="Respuesta de la pregunta de seguridad elegida"
              value={respuestaSeg}
              onChange={handleInputChange}
            />
        </label>
        
        <p></p>
        <p></p>
        
        <button type="submit">Siguiente</button>
      </form>
      
      </div>
      <div className="register-background-image">
        <img src={inicioImg} alt="Imagen de fondo" className="register-fullscreen-bg__image" />
      </div>
    </div>
    </div>

  );
}

export default Register;
