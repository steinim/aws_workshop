var mysql = require("mysql");

var conn = mysql.createConnection({
    host: "mysqlinstance.czyzvcnpuodt.eu-west-1.rds.amazonaws.com",
    user: "admin",
    password: "qwer1234",
    database: "UserDB"
    });

conn.connect(function(err) {
  if (err) {
    console.log("Error connectiong to mysql");
    return;
  }
  console.log("mysql connected");

  var user =
  {
    userID: "2",
    username: "roy",
    password: "theboy"
  }

  conn.query('INSERT INTO `UserDB`.`Users` SET ?', user, function (err,  res) {
    if (err) throw err;
    console.log("User ID", res.insertId);

    conn.end(function(err) {
      console.log("mysql disconnected");
    });
  })

/*
conn.query('SELECT * FROM `Tracking`.`Locations`', function (err,  rows) {
    if (err) throw err;
    console.log(rows);

    for (var i = 0; i<rows.length; i++) {
      console.log(rows[i].id + " -> (" +
        rows[i].lat + "," + rows[i].lng + ")");
    }
    conn.end(function(err) {
      console.log("mysql disconnected");
    });
  })
*/

/*  conn.query('UPDATE `Tracking`.`Locations` SET lat = ?, lng = ? WHERE id = ?',
           ['1.8765432', '123.56789', 3],
           function (err,  result) {
              if (err) throw err;
              console.log("Row(s) modified "+ result.changedRows);
              conn.end(function(err) {
                console.log("mysql disconnected");
              });
  }) 
*/
/*
conn.query('DELETE FROM `Tracking`.`Locations` WHERE id = ?',
           [3],
           function (err,  result) {
              if (err) throw err;
              console.log("Row(s) delted "+ result.affectedRows);
              conn.end(function(err) {
                console.log("mysql disconnected");
              });
  })
*/

});

