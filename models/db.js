const mysql = require("mysql");
const dbConfig = require("../config/db.config");
// Crearemos la conexion con la base de datros

const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});
// Abriremos la conexión con MYSQL
connection.connect((error) => {
  if (error) {
    throw error;
  }
  console.log("Conexión con la base de datos exitosa.");
});
module.exports = connection;
