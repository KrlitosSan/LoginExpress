const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
// Get the client
const cors = require("cors");
const session = require("express-session");
const md5 = require("md5");
const bcrypt = require("bcrypt");
const login = require("./login");
const registro = require("./registro");
const { obtenerUsuarios, eliminarUsuarios } = require("./usuarios");
const validar = require("./validar");
const connection = require("./conexion");
const saltRounds = 10;
const MySQLStore = require("express-mysql-session")(session);
//root:dJuxoKBWvSUpWIZHjdVEZtYbJVAAMTmN@autorack.proxy.rlwy.net:32376/railway

mysql: app.use(
  cors({
    origin: process.env.URLFRONTEND || "http://localhost:5173",
    credentials: true,
  })
);

const sessionStore = new MySQLStore({} /* session store options */, connection);


app.use(
  session({
    secret: process.env.SECRETSESSION || "secretjajaja",
    proxy: process.env.MODE_ENV === "production",
    cookie: {
      secure: process.env.MODE_ENV === "production",
      sameSite: "none",
      },
    store: sessionStore,
  })
);

// Create the connection to database

app.get("/", (req, res) => {
  res.send("Hello krlitos!");
});

app.get("/login", login);

app.get("/validar", validar);

app.get("/registro", registro);

app.get("/usuarios", obtenerUsuarios);

app.delete("/usuarios", eliminarUsuarios);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
