const validar = async (req, res) => {
  if (req.session.usuario) {
    res.status(200).send("Inicio de sesion correcto");
  } else {
    res.status(401).send("Inicio de sesion incorrecto");
  }
};

module.exports = validar;