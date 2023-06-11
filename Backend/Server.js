const express = require('express');
const cors = require("cors");
const pool = require("./Bdatos");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
  const nomb = req.body["nombre"];
  const email = req.body["email"];
  const pass = req.body["pass"];
  const celular = req.body["celular"];
  const university = req.body["universidad"];
  const carrer = req.body["carrera"];
  const nacimiento = req.body["birthday"];
  const sexo = req.body["sexo"];
  const descripcion = req.body["descripcion"];
  const questionSeg = req.body["preguntaSeg"];
  const answerSeg = req.body["respuestaSeg"];

  const insertar = 'INSERT INTO USUARIOS (nombre, email, pass, celular, universidad, carrera, birthday, sexo, descripcion, preguntaseg, respuestaseg) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)';
  const values = [nomb, email, pass, celular, university, carrer, nacimiento, sexo, descripcion, questionSeg, answerSeg];

  pool.query(insertar, values)
    .then((response) => {
      console.log("datos guardados");
      console.log(response);
      res.send("Datos guardados exitosamente");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error al guardar los datos");
    });
});


app.post('/login', (req, res) => {
  const nombre = req.body.nombre;
  const email = req.body.email;
  const pass = req.body.pass;

  // Consultar la base de datos para verificar las credenciales
  pool.query('SELECT * FROM USUARIOS WHERE nombre = $1 OR email =$2 AND pass = $3', [nombre, email, pass])
    .then((result) => {
      if (result.rows.length > 0) {
        // Las credenciales son correctas
        res.send('Datos correctos');
      } else {
        // Las credenciales son incorrectas
        res.status(401).send('Datos incorrectos');
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Error al verificar las credenciales');
    });
});

app.get('/MiPerfil/:email', (req, res) => {
  const email = req.params.email;
  // Consultar la base de datos para obtener los datos del usuario por su ID
  pool.query('SELECT * FROM USUARIOS WHERE email = $1', [email])
    .then((result) => {
      if (result.rows.length > 0) {
        // Se encontró un usuario con el ID especificado
        const usuario = result.rows[0];
        res.send(usuario); // Envía los datos del usuario como respuesta
      } else {
        // No se encontró un usuario con el ID especificado
        res.status(404).send('Usuario no encontrado');
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Error al obtener los datos del usuario');
    });
});

app.get('/usuarios', (req, res) => {
  pool.query('SELECT * FROM USUARIOS')
    .then((result) => {
      const usuarios = result.rows;
      res.send(usuarios); // Enviar todos los usuarios como respuesta
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Error al obtener los datos de los usuarios');
    });
});

app.put('/editarperfil/:email', (req, res) => {
  const email = req.params.email;
  const { nombre, pass, celular, universidad, carrera, sexo, descripcion } = req.body;

  const actualizar = 'UPDATE Usuarios SET nombre = $1, pass = $2, celular = $3, universidad = $4, carrera = $5, sexo = $6, descripcion = $7 WHERE email = $8';
  const values = [nombre, pass, celular, universidad, carrera, sexo, descripcion, email];

  pool.query(actualizar, values)
    .then((response) => {
      console.log("Datos guardados");
      console.log(response);
      res.send("Datos guardados exitosamente");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error al guardar los datos");
    });
});

app.get('/recuperarpass/:email', (req, res) => {
  const email = req.params.email;
  // Consultar la base de datos para obtener los datos del usuario por su ID
  pool.query('SELECT * FROM USUARIOS WHERE email = $1', [email])
    .then((result) => {
      if (result.rows.length > 0) {
        // Se encontró un usuario con el ID especificado
        const usuario = result.rows[0];
        res.send(usuario); // Envía los datos del usuario como respuesta
      } else {
        // No se encontró un usuario con el ID especificado
        res.status(404).send('Usuario no encontrado');
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Error al obtener los datos del usuario');
    });
});


app.put('/changepass/:email', (req, res) => {
  const email = req.params.email;
  const {pass} = req.body;

  const actualizar = 'UPDATE Usuarios SET pass = $1 WHERE email = $2';
  const values = [pass, email];

  pool.query(actualizar, values)
    .then((response) => {
      console.log("Datos guardados");
      console.log(response);
      res.send("Datos guardados exitosamente");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error al guardar los datos");
    });
});


app.post("/Perfiles/cita", (req, res) => {
  const emailprimero = req.body["emailprimero"];
  const emailsegundo = req.body["emailsegundo"];

  const verificarExistencia1 = 'SELECT COUNT(*) FROM CITA WHERE emailprimero = $1 AND emailsegundo = $2';
  const verificarExistencia2 = 'SELECT COUNT(*) FROM CITA WHERE emailsegundo = $1 AND emailprimero = $2';

  const values = [emailprimero, emailsegundo];

  pool.query(verificarExistencia1, values)
    .then((result1) => {
      const rowCount1 = result1.rows[0].count;

      pool.query(verificarExistencia2, values)
        .then((result2) => {
          const rowCount2 = result2.rows[0].count;
          if (rowCount1==0) {
            const insertar = 'INSERT INTO CITA (emailprimero, emailsegundo) VALUES ($1, $2)';
        
            pool.query(insertar, values)
              .then(() => {
                console.log("Datos guardados");
                if (rowCount2>0){
                  res.send("match");
                }
              })
              .catch((err) => {
                console.log(err);
                res.status(500).send("Error al guardar los datos");
              });
          }
         
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send("Error al verificar la existencia de los datos");
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error al verificar la existencia de los datos");
    });
});

app.listen(4000, () => console.log("Servidor en localhost:4000"));