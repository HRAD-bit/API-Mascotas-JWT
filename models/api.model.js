const sql = require("./db.js");
// constructor
const Mascota = function(mascota) {
  this.nombre = mascota.nombre;
  this.raza = mascota.raza;
  this.edad = mascota.edad;
};
Mascota.create = (newMascota, result) => {
  sql.query("INSERT INTO mascotas SET ?", newMascota, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created mascota: ", { id: res.insertId, ...newMascota });
    result(null, { id: res.insertId, ...newMascota });
  });
};
Mascota.findById = (id, result) => {
  sql.query(`SELECT * FROM mascotas WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found mascota: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Mascota with the id
    result({ kind: "not_found" }, null);
  });
};
Mascota.getAll = (nombre, result) => {
  let query = "SELECT * FROM mascotas";
  if (nombre) {
    query += ` WHERE nombre LIKE '%${nombre}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("mascotas: ", res);
    result(null, res);
  });
};
Mascota.updateById = (id, mascota, result) => {
  sql.query(
    "UPDATE mascotas SET nombre = ?, raza = ?, edad = ? WHERE id = ?",
    [mascota.nombre, mascota.raza, mascota.edad, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Mascota with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated mascota: ", { id: id, ...mascota });
      result(null, { id: id, ...mascota });
    }
  );
};
Mascota.remove = (id, result) => {
  sql.query("DELETE FROM mascotas WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Mascota with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted mascota with id: ", id);
    result(null, res);
  });
};
Mascota.removeAll = result => {
  sql.query("DELETE FROM mascotas", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} mascotas`);
    result(null, res);
  });
};
module.exports = Mascota;