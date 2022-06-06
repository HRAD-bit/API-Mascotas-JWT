const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const session = require("express-session");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const PORT = process.env.PORT || 8081;
var corsOption = {
  origin: ["http://localhost:8080", "https://localhost:8080"],
};
app.use(cors(corsOption));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to HRAD's app!" });
// });
// app.get("/", (req, res) =>
//   res.send(`<!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Document</title>
// </head>
// <body>

//   <form id="formLogin" action="/api/login" method="POST">
//   <img class="mb-4" src="img/bootstrap-logo.svg" alt="" width="72" height="57">
//   <div class="form-floating">
//     <input type="text" class="form-control" id="email" name="email" placeholder="Email">
//     <label for="email">Email</label>
//   </div>
//   <div class="form-floating">
//     <input type="password" class="form-control" id="password" name="password" placeholder="Password">
//     <label for="password">Password</label>
//   </div>
//   <button class="w-100 btn btn-lg btn-primary" type="submit">Login</button>
// </form>

// <br>
// <a href="/register" type="button" class="w-100 btn btn-lg btn-bd-primary">Registrarse</a>

// </body>
// </html>
//                                         `)
// );
require("./routes/routes")(app);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
