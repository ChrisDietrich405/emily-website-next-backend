const express = require("express");
const app = express();

const port = 3001;
const mysql = require("mysql2");
const cors = require("cors");
app.use(cors());
app.use(express.static("public"));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "secret",
  database: "emily-website-next",
});

app.get(`/resources_information/:id`, (req, res) => {
  const { id } = req.params;

  connection.query(
    "SELECT * FROM `resources_information` WHERE `resource_id` = ?",
    [id],
    function (err, results) {
      console.log(err);
      res.json(results);
    }
  );
});

app.get(`/resources/:id`, (req, res) => {
  const { id } = req.params;

  connection.query(
    "SELECT * FROM `resources` WHERE `id` = ?",
    // "SELECT * FROM `resources_information` WHERE `resource_id` = ?",
    [id],
    function (err, results) {
      console.log(err);
      res.json(results);
    }
  );
});

app.get(`/resources`, (req, res) => {
  connection.query(
    "SELECT * FROM `resources`",

    function (err, results) {
      console.log(err);
      res.json(results);
    }
  );
});

app.get(`/posts/:id`, (req, res) => {
  const { id } = req.params;

  connection.query(
    "SELECT * FROM `posts` WHERE `id` = ?",
    // "SELECT * FROM `resources_information` WHERE `resource_id` = ?",
    [id],
    function (err, results) {
      if (results && results.length === 1) {
        res.json(results[0]);
      } else {
        res.json({});
      }
    }
  );
});

app.get(`/posts`, (req, res) => {
  connection.query(
    "SELECT * FROM `posts`",

    function (err, results) {
      console.log(err);
      res.json(results);
    }
  );
});

app.get(`/testimonials`, (req, res) => {
  connection.query(
    "SELECT * FROM `testimonials`",

    function (err, results) {
      console.log(err);
      res.json(results);
    }
  );
});

app.listen(port, function () {
  console.log("Example app listening on port " + port + "!");
});
