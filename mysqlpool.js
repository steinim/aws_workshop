var mysql = require("mysql");

var pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "qwer1234",
    database: "Tracking"
    });

var getConnection = function(callback) {
    pool.getConnection = (function(err, connection) {
      callback(err, connection);
  });

};

