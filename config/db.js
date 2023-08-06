const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "secret",
  database: "emily-website-next",
});

module.exports = connection;
