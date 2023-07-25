const mysql = require("mysql2");

const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "M@heNd@r07",
  database: "usersdata",
});
mysqlConnection.connect(function (err) {
  if (err) {
    console.log("Error in DB connection: " + JSON.stringify(err, undefined, 2));
  } else {
    console.log("DB connected successfully");
  }
});
module.exports = mysqlConnection;
