const express = require("express");
const app = express();

const connection = require("./config/db");

const port = 3001;
// const mysql = require("mysql2");
const cors = require("cors");
app.use(cors());
app.use(express.static("public"));

//this should go into a db file and is setting up the connection to mysql
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "secret",
//   database: "emily-website-next",
// });

//matching the resources_information with the resources category

// app.get(`/resources_information/:id`, (req, res) => {
//   const { id } = req.params;

//   const queryString = `SELECT * FROM resources_information WHERE resource_id = ${id}`;

//   connection.query(queryString, function (err, results) {
//     console.log(err);
//     res.json(results);
//   });
// });

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

//dynamic way to get individual categories

app.get(`/resources/:id`, (req, res) => {
  const { id } = req.params;

  connection.query(
    "SELECT * FROM `resources` WHERE `id` = ?",
    [id],
    // "SELECT * FROM `resources_information` WHERE `resource_id` = ?",

    function (err, results) {
      console.log(err);
      res.json(results);
    }
  );
});

//getting all the categories

app.get(`/resources`, (req, res) => {
  connection.query(
    "SELECT * FROM `resources`",

    function (err, results) {
      console.log(err);
      res.json(results);
    }
  );
});

///getting individual blogs

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

//posting an individual blog

app.get(`/posts`, (req, res) => {
  connection.query(
    "SELECT * FROM `posts`",

    function (err, results) {
      console.log(err);
      res.json(results);
    }
  );
});

// getting all the testimonials

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
