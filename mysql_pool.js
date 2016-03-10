var mysql = require("mysql");

var pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "qwer1234",
    database: "Tracking"
    });

pool.getConnection(function(err, conn) {
  if (err) {
    conn.release();
    return;
  }

  conn.query('SELECT * FROM Locations', function(err, rows) {
    if (err) throw err;
    console.log(rows);
    for(var i = 0; i<rows.length; i++) {
      console.log(rows[i].id + " -> " + "(" +
                   rows[i].lat + "," + rows[i].lng + ")");
    }
    conn.release();
  });
});

