const connection = require("./connection");
const express = require("express");
const bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());

app.get("/user", (req, res) => {
  connection.query("SELECT * FROM users", function (err, rows) {
    if (err) {
      console.log(err);
    } else {
      res.send(rows);
    }
  });
});
app.get("/user/:id", (req, res) => {
  connection.query(
    "SELECT * FROM users where id=?",
    [req.params.id],
    function (err, rows) {
      if (err) {
        console.log(err);
      } else {
        res.send(rows);
      }
    }
  );
});
app.delete("/user/:id", (req, res) => {
  connection.query(
    "DELETE FROM users WHERE id=?",
    [req.params.id],
    function (err, rows) {
      if (err) {
        console.log(err);
      } else {
        res.send(rows);
      }
    }
  );
});

app.post("/user", (req, res) => {
  var user = req.body;
  var emdata = [user.id, user.first_name, user.last_name];
  connection.query(
    "insert into users (id,first_name,last_name) values(?)",
    [emdata],
    function (err, rows) {
      if (err) {
        console.log(err);
      } else {
        res.send(rows);
      }
    }
  );
});

app.put("/user", (req, res) => {
  var emp = req.body;
  connection.query(
    "UPDATE users SET ? WHERE id=" + emp.id,
    [emp],
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        if (rows.affectedRows === 0) {
          var empData = [emp.id, emp.first_name,emp.last_name];
          connection.query(
            "INSERT INTO users(id,first_name,last_name) values(?)",
            [empData],
            (err, rows) => {
              if (err) {
                console.log(err);
              } else {
                res.send(rows);
              }
            }
          );
        } else {
          res.send(rows);
        }
      }
    }
  );
});
app.listen(3000, () => console.log("express server is running on post 3000"));
