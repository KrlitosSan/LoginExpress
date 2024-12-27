const connection = require("./conexion");

const obtenerUsuarios = async (req, res) => {
  if (!req.session.usuario) {
    res.status(401).send("Inicio de sesion incorrecto");
    return;
  }
  try {
    const [results, fields] = await connection.query(
      "SELECT * FROM `usuarios`"
    );
    res.status(200).json(results);

    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  } catch (err) {
    console.log(err);
    res.status(500).send("Error al registrar el usuario");
  }
};

const eliminarUsuarios = async (req, res) => {
  if (!req.session.usuario) {
    res.status(401).send("Inicio de sesion incorrecto");
    return;
  }
  const datos = req.query;
  try {
    const [results, fields] = await connection.query(
      "DELETE FROM usuarios WHERE `usuarios`.`Id` = ?",
      [datos.id]
    );
    if (results.affectedRows > 0) {
      res.status(200).send("Usuario eliminado");
    } else {
      res.status(401).send("No se pudo eliminar ");
    }

    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  } catch (err) {
    console.log(err);
  }
};

module.exports = { obtenerUsuarios, eliminarUsuarios };
