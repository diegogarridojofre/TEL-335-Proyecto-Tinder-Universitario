import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import inicioImg from './img/fondoVentanas.jpeg';
import logoImage from './img/logo.jpeg';
import { getEmail } from './auxiliar';
import './UploadImage.css'

function Register() {
  const [email] = useState(getEmail());
  const [nameImgPerfil, setNameImgPerfil] = useState("lalalala");
  const [imgPerfil, setImgPerfil] = useState(null);
  const [nameImg1, setNameImg1] = useState("");
  const [img1, setImg1] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name } = e.target;
    if (name === "img_perfil") {
        const file = e.target.files[0];
        const extension = file.name.split(".").pop();
        setNameImgPerfil(`imgperfil${email}.${extension}`);
        setImgPerfil(file);
      } else if (name === "img1") {
        const file = e.target.files[0];
        const extension = file.name.split(".").pop();
        setNameImg1(`img1${email}.${extension}`);
        setImg1(file);
      }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("name_imgperfil", nameImgPerfil);
    formData.append("img_perfil", imgPerfil);
    formData.append("name_img1", nameImg1);
    formData.append("img1", img1);

    axios
      .post("http://localhost:4000/uploadImg", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        navigate('/Login');
        // Hacer algo con la respuesta, como mostrar un mensaje de éxito
      })
      .catch((error) => {
        console.log(error);
        // Manejar el error, como mostrar un mensaje de error
      });
  };

  return (
    <div className="upload-fullscreen-bg">
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
      <div className="upload-container">
        <div className="upload-form">
          <h2 style={{ fontWeight: 'bold' }}>Añade tus fotos</h2>
          <form onSubmit={handleSubmit}>
           
            <input
              type="file"
              name="img_perfil"
              accept="image/*"
              onChange={handleInputChange}
              required
            />
           
            <input
              type="file"
              name="img1"
              accept="image/*"
              onChange={handleInputChange}
              required
            />
            <button type="submit">Guardar</button>
          </form>
        </div>
        <div className="upload-background-image">
          <img src={inicioImg} alt="Imagen de fondo" className="upload-fullscreen-bg__image" />
        </div>
      </div>
    </div>
  );
}

export default Register;
