import express from "express";
import { db } from "./config/firebase_config.js";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

const app = express();

app.listen(3000, (req, res) => {
  console.log("Server is running on port http://localhost:3000/");
});
app.set("views", "./vistas");
app.set("view engine", "ejs");
app.use(express.static("./estilos"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/registrarse", (req, res) => {
  res.render("registrarse");
});

app.post("/registrarseFormulario", (req, res) => {
  const usuario = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    correo: req.body.correo,
    password: req.body.password,
  };
  console.log(usuario);
  const col = collection(db, "usuarios");
  addDoc(col, usuario)
    .then((docRef) => {
      res.redirect("/");
    })
    .catch((error) => {
      res.status(500).send("Error al registrar usuario");
    });
});

/* app.post("/eliminarCuenta", (req, res) => {
  const docRef = doc(db, "usuarios", req.body.id);
  deleteDoc(docRef);
  res.redirect("/");
}); */

app.post("/eliminarCuenta/:id", (req, res) => {
  console.log(req.params.id);
  const docRef = doc(db, "usuarios", req.params.id);
  deleteDoc(docRef);
  const colRef = collection(db, "usuarios");
  const usuarios = [];
  getDocs(colRef)
    .then((querySnapshot) => {
      const usuarios = [];
      querySnapshot.forEach((doc) => {
        usuarios.push({
          id: doc.id,
          nombre: doc.data().nombre,
          apellido: doc.data().apellido,
          correo: doc.data().correo,
          contraseña: doc.data().contraseña,
        });
      });
      res.redirect("/listaUsuarios");
    })

    .catch((error) => {
      console.log("Error obteniendo los usuarios: ", error);
    });
});

app.get("/perfilesUsuarios", (req, res) => {
  const colRef = collection(db, "usuarios");
  const usuarios = [];
  getDocs(colRef)
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        usuarios.push({
          id: doc.id,
          nombre: doc.data().nombre,
          apellido: doc.data().apellido,
          correo: doc.data().correo,
          contraseña: doc.data().contraseña,
        });
      });
      res.render("perfilesUsuarios", { usuarios });
    })
    .catch((error) => {
      console.log("Error obteniendo los usuarios: ", error);
    });
});

app.get("/listaUsuarios", (req, res) => {
  const colRef = collection(db, "usuarios");
  const usuarios = [];
  getDocs(colRef)
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        usuarios.push({
          id: doc.id,
          nombre: doc.data().nombre,
          apellido: doc.data().apellido,
          correo: doc.data().correo,
          contraseña: doc.data().contraseña,
        });
      });
      res.render("listaUsuarios", { usuarios });
    })
    .catch((error) => {
      console.log("Error obteniendo los usuarios: ", error);
    });
});

app.post("/modificarUsuario/:id", (req, res) => {
  const { nombre, apellido, correo, password } = req.body;
  const docRef = doc(db, "usuarios", req.params.id);
  const data = {};

  if (nombre) data.nombre = nombre;
  if (apellido) data.apellido = apellido;
  if (correo) data.correo = correo;
  if (password) data.password = password;

  updateDoc(docRef, data)
    .then(() => {
      console.log("Usuario modificado correctamente");
      res.redirect("/listaUsuarios");
    })
    .catch((error) => {
      console.log("Error modificando el usuario: ", error);
    });
});
