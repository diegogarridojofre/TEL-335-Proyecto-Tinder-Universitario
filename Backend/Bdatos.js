const {Pool}= require ("pg");
const pool = new Pool({
    user:"postgres",
    password: "0801",
    host:"localhost",
    port:8080,
    database:"studymatch"

})
pool.connect()
  .then(() => console.log('Conexión establecida'))
  .then(() => pool.query(
    `CREATE TABLE IF NOT EXISTS USUARIOS (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      pass VARCHAR(100) NOT NULL,
      celular VARCHAR(100) NOT NULL,
      universidad VARCHAR(100) NOT NULL,
      carrera VARCHAR(100) NOT NULL,
      birthday VARCHAR(100) NOT NULL,
      sexo VARCHAR(100) NOT NULL,
      descripcion VARCHAR(100) NOT NULL,
      preguntaseg VARCHAR(100) NOT NULL,
      respuestaseg VARCHAR(100) NOT NULL
    );`
  ))
  .then(() => pool.query(`
  CREATE TABLE IF NOT EXISTS cita (
    id SERIAL PRIMARY KEY,
    emailprimero VARCHAR(100),
    emailsegundo VARCHAR(100)
    );`))
  .then(() => pool.query(`
  CREATE TABLE IF NOT EXISTS fotos (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100),
    name_imgperfil VARCHAR(100),
    img_perfil BYTEA,
    name_img1 VARCHAR(100),
    img1 BYTEA
  );`))
  .then(() => pool.query(`
  CREATE TABLE IF NOT EXISTS ESTUDIO(
    id SERIAL PRIMARY KEY,
    emailprimero VARCHAR(100),
    emailsegundo VARCHAR(100)
    );`))
  .then(() => console.log('Tabla creada exitosamente'))
  .catch((error) => console.error(error))
  ;

  

module.exports= pool;
