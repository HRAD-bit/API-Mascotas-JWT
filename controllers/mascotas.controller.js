const Mascotas = require("../models/api.model.js");
// Crear y guardar una mascota
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "No puede estar vacio!",
    });
  }
  // Create a Mascotas
  const mascotas = new Mascotas({
    nombre: req.body.nombre,
    edad: req.body.edad,
    raza: req.body.raza,
  });
  // Guardar la mascota en la base de datos
  Mascotas.create(mascotas, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió algún error al momento de crear la mascota.",
      });
    else res.send(data);
  });
};
// Encontrar todas las mascotas desde la base de datos
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;
  Mascotas.getAll(nombre, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un problema al buscar las mascotas 1.",
      });
    else res.json(data);
  });
};
exports.findAllPublished = (req, res) => {
  Mascotas.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un problema al buscar las mascotas 2.",
      });
    else res.send(data);
  });
};
exports.findOne = (req, res) => {
  Mascotas.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró a la mascota con el ID: ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error buscando la mascota ocn ID: " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// UPDATE
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "No puede estar vacío!!",
    });
  }
  console.log(req.body);
  Mascotas.updateById(req.params.id, new Mascotas(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró a la Mascota con ID: ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error actualizando la mascota con ID: " + req.params.id,
        });
      }
    } else res.send(data);
  });
};
// DELETE
exports.delete = (req, res) => {
  Mascotas.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró a la mascota con id: ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "No se pudo borrar la mascota con Id: " + req.params.id,
        });
      }
    } else res.send({ message: `La mascota se ha eliminado correctamente!` });
  });
};

exports.deleteAll = (req, res) => {
  Mascotas.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Algo ha ocurrido al eliminar todas las mascotas.",
      });
    else res.send({ message: `Todas las mascotas han sido eliminadas exitosamente!!` });
  });
};
