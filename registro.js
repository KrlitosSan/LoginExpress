const connection = require("./conexion");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const registro = async (req, res) => {
  if (!req.session.usuario) {
    res.status(401).send("Inicio de sesion incorrecto");
    return;
  }
  const datos = req.query;
  try {
    const hash = bcrypt.hashSync(datos.clave, saltRounds);
    const [results, fields] = await connection.query(
      "INSERT INTO `usuarios` (`Id`, `usuario`, `clave`) VALUES (NULL, ?, ?);",
      [datos.usuario, hash]
    );
    if (results.affectedRows > 0) {
      req.session.usuario = datos.usuario;
      res.status(200).send("Usuario y clave Registrados");
    } else {
      res.status(401).send("No se registro el usuario");
    }
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  } catch (err) {
    console.log(err);
    res.status(500).send("Error al registrar el usuario");
  }
};
module.exports = registro;
