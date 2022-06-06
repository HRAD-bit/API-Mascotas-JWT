module.exports = (app) => {
  const mascotas = require("../controllers/mascotas.controller.js");
  const authController = require("../controllers/auth.controller");

  var router = require("express").Router();
  var routerAuth = require("express").Router();

  // MASCOTAS --------------
  // Create a new Mascota
  router.post("/", mascotas.create);
  // Retrieve all Mascotas
  router.get("/", mascotas.findAll);
  // Retrieve a single Mascota with id
  router.get("/:id", mascotas.findOne);
  // Update a Mascota with id
  router.put("/:id", mascotas.update);
  // Delete a Mascota with id
  router.delete("/:id", mascotas.delete);
  // Delete all Mascotas
  router.delete("/", mascotas.deleteAll);

  // RUTAS PARA MÉTODOS AUTH
  routerAuth.post("/register", authController.register);
  routerAuth.post("/login", authController.login);
  routerAuth.get("/logout", authController.logout);
  app.use("/api/mascotas", router);
  app.use("/api", routerAuth);
};
