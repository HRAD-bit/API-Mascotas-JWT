const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const conexion = require("../models/db");
const { promisify } = require("util");

//procedimiento para registrarnos
exports.register = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    
    let passHash = await bcryptjs.hash(password, 8);
    //console.log(passHash)
    conexion.query(
      "INSERT INTO users SET ?",
      { email: email, name: name, password: passHash },
      (error, results) => {
        if (error) {
          console.log(error);
        } else {
          conexion.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            async (error, results) => {
              if (
                results.length == 0 ||
                !(await bcryptjs.compare(password, results[0].password))
              ) {

                console.log("User or pass incorrects");
                res.status(500).send([
                  {
                    status: 500,
                    error: false,
                    message: "Not Success",
                  },
                ]);
              } else {
                //inicio de sesión OK
                const id = results[0].id;
                const token = jwt.sign({ id: id }, process.env.JWT_SECRETO, {
                  expiresIn: process.env.JWT_TIEMPO_EXPIRA,
                });
                //generamos el token SIN fecha de expiracion
                //const token = jwt.sign({id: id}, process.env.JWT_SECRETO)
                console.log("TOKEN: " + token + " para el USUARIO : " + email);

                const cookiesOptions = {
                  expires: new Date(
                    Date.now() +
                      process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                  ),
                  httpOnly: true,
                };
                const tokenCookie = res.cookie("jwt", token, cookiesOptions);
                // res.redirect("/api/mascotas");
                res.send({
                  error: false,
                  message: "Success",
                  token: token,
                  email: email,
                });
              }
            }
          );
        }

        // res.redirect("/");
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      console.log("Datos vacios, por favor, ingrese lo datos correctamente");
      res.status(500);
      return;
    } else {
      conexion.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (error, results) => {
          if (
            results.length == 0 ||
            !(await bcryptjs.compare(password, results[0].password))
          ) {
            // res.send(bcryptjs.compare(password, results[0].password));
            // res.send("Usuario y / o pass incorrectos.");
            // res.send([{
            //   status: false,
            //   message: "No se encuentra ese email"
            // }]);
            console.log("User or pass incorrects");
            res.status(500).send([
              {
                status: 500,
                error: false,
                message: "Not Success",
              },
            ]);
          } else {
            //inicio de sesión OK
            const id = results[0].id;
            const token = jwt.sign({ id: id }, process.env.JWT_SECRETO, {
              expiresIn: process.env.JWT_TIEMPO_EXPIRA,
            });
            //generamos el token SIN fecha de expiracion
            //const token = jwt.sign({id: id}, process.env.JWT_SECRETO)
            console.log("TOKEN: " + token + " para el USUARIO : " + email);

            const cookiesOptions = {
              expires: new Date(
                Date.now() +
                  process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
              ),
              httpOnly: true,
            };
            const tokenCookie = res.cookie("jwt", token, cookiesOptions);
            // res.redirect("/api/mascotas");
            res.send({
              error: false,
              message: "Success",
              token: token,
              email: email,
            });
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

exports.isAuthenticated = async (req, res, next) => {
  console.log(req.cookies.jwt);
  if (req.cookies.jwt) {
    try {
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRETO
      );
      conexion.query(
        "SELECT * FROM users WHERE id = ?",
        [decodificada.id],
        (error, results) => {
          if (!results) {
            return next();
          }
          req.email = results[0];
          return next();
        }
      );
    } catch (error) {
      console.log(error);
      return next();
    }
  } else {
    res.redirect("/");
    // res.send("Necesitas loguearte")
  }
};

exports.logout = (req, res) => {
  res.clearCookie("jwt");
  // return res.redirect("/");
  console.log("End session");
  return res.send("Sesión finalizada");
};
