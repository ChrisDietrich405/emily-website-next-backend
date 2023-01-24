const express = require("express");
const app = express();

const port = 3001;
const mysql = require("mysql2");

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "secret",
  database: "emily-website-next",
});

// simple query
// connection.query(
//     'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
//     function (err, results, fields) {
//       console.log(results); // results contains rows returned by server
//       console.log(fields); // fields contains extra meta data about results, if available
//     }
//   );
// with placeholder
// connection.query(
//   "SELECT * FROM `table` WHERE `name` = ? AND `age` > ?",
//   ["Page", 45],
//   function (err, results) {
//     console.log(results);
//   }
// );

// respond with "hello world" when a GET request is made to the homepage
app.get("/", (req, res) => {
  res.send("ok");
});

app.get("/resources", (req, res) => {
  connection.query(
    "SELECT * FROM `resources`",
    function (err, results, fields) {
      res.send(results);
    }
  );
});

app.get(`/resources/:id`, (req, res) => {
  const { id } = req.params;

  connection.query(
    "SELECT * FROM `resources_information` WHERE `resource_id` = ?",
    [id],
    function (err, results, fields) {
      console.log(err);
      res.send(results);
    }
  );
});

app.listen(port, function () {
  console.log("Example app listening on port " + port + "!");
});
