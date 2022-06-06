const express = require("express");
// const res = require("express/lib/response");
const app = express();
const port = 3000;
const jwt = require("jsonwebtoken");
require("dotenv").config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) =>
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form method="POST" action="/auth">
        Nombre de usuario: <input type="text" name="text" id=""><br>
        Password: <input type="password" name="password" id=""><br>
        <input type="submit" value="Iniciar Sesion">
    </form>
    
</body>
</html> 
                                        `)
);
app.get("/api", validateToken, (req, res) => {
  res.json({
    tuits: [
      {
        id: 0,
        text: "Este es mi primer tuit",
        username: "vladimir",
      },
      {
        id: 1,
        text: "Este es mi segundo tuit",
        username: "door_alen",
      },
    ],
  });
});
app.post("/auth", (req, res) => {
  const { username, password } = req.body;

  //Consultar a la BD y cvalidad que existen tanto
  //Username y password
  const user = { username: username };
  const accessToken = generateAccessToken(user);
  res.header("autorization", accessToken).json({
    message: "Usuario autenticado",
    token: accessToken,
  });
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.SECRET, { expiresIn: "5m" });
}
function validateToken(req, res, next) {
  const accessToken = req.headers["authorization"] || req.query.accesstoken;
  if (!accessToken) res.send("Access denied");

  jwt.verify(accessToken, process.env.SECRET, (err, user) => {
    if (err) {
      res.send("Access denied, token expired or incorrect");
    } else {
      next();
    }
  });
}
app;
app.listen(port, () => console.log(`Seridor corriendo en el puerto ${port}!`));
