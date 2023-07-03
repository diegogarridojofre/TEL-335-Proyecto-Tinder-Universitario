import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap';
import Login from "./Login.js";
import Register from "./Register.js";
import Home from "./home.js";
import Perfiles from "./Perfiles.js";
import MiPerfil from "./MiPerfil.js";
import EditarPerfil from "./EditarPerfil.js";
import RecuperarPass from "./RecuperarPass.js";
import RecuperarPassPreguntas from "./RecuperarPassPreguntas.js";
import MatchCita from "./MatchCita.js";
import UploadImage from "./UploadImage.js";
import MatchEstudio from "./MatchEstudio.js";
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';



function App() {
  return (
    <Router>
        <div className="App">
        
        
        <Container>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/Perfiles" element={<Perfiles />} />
            <Route path="/MiPerfil" element={<MiPerfil />} />
            <Route path="/EditarPerfil" element={<EditarPerfil />} />
            <Route path="/RecuperarPass" element={<RecuperarPass />} />
            <Route path="/RecuperarPassPreguntas" element={<RecuperarPassPreguntas />} />
            <Route path="/MatchCita" element={<MatchCita />} />
            <Route path="/UploadImage" element={<UploadImage />} />
            <Route path="/MatchEstudio" element={<MatchEstudio />} />
           
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;




