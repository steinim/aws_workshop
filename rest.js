var express = require('express');

//returns an instance of Express server---
var app = express();

//---parse the body of the request and set the
// body property on the request object---
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//---sample list of users---
/*
var users =
{                
    1: {
        username:"john",
        password:"secret"
    },                
    2: {
        username:"mary",
        password:"topsecret"
    },                
    3: {
        username:"tim",
        password:"nosecret"
    }
}
*/

var users;


var mysql = require("mysql");

var conn = mysql.createConnection({
    host: "mysqlinstance.czyzvcnpuodt.eu-west-1.rds.amazonaws.com",
    user: "admin",
    password: "qwer1234",
    database: "UserDB"
    });

//-----------------GET-------------------
//=======================================
// test: curl -v http://localhost:3000/users
app.get('/users', function(req, res) {
  conn.query('SELECT * FROM `UserDB`.`Users`', function (err,  rows) {
    if (err) throw err;
    console.log(rows);

    for (var i = 0; i<rows.length; i++) {
      console.log(rows[i].id + " -> (" + rows[i].userID + "," + rows[i].username + "," + rows[i].password + ")");
    }
    //conn.end();
    res.send(rows);
  })
});

//test: curl -v http://localhost:3000/users/2
app.get('/users/:id', function(req, res) {
    res.send(users[req.params.id]);    
});

//-----------------PUT-------------------
//=======================================
// test: curl -i -X PUT -H 'Content-Type: application/json' -d '{"username":"jim","password":"whatsecret"}' http://localhost:3000/users/2
app.put('/users/:id', function(req, res) {    
    //---check that both username and password fields are there---
    if (!req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('password')) {
        res.statusCode = 400;
        res.send('Error 400: Post syntax incorrect.');
        return;
    }

    //---get the new user info---
    var user = {
        username: req.body.username,
        password: req.body.password
    }

  conn.query('INSERT INTO `UserDB`.`Users` SET ?', user, function (err,  res) {
    if (err) throw err;
    console.log("User ID", res.insertId);
    //conn.end();
  })

    //---send back the users dictionary to the client---
    res.send(users);
});

//---------------POST--------------------
//=======================================
//test: curl -i -X POST -H 'Content-Type: application/json' -d '{"username":"jim","password":"whatsecret"}' http://localhost:3000/users/1
//test: curl -i -X POST -H 'Content-Type: application/json' -d '{"username":"jim","password":"whatsecret"}' http://localhost:3000/users/9
app.post('/users/:id', function(req, res) {    
    //---check that both username and password fields are there---
    if (!req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('password')) {
        res.statusCode = 400;
        res.send('Error 400: Post syntax incorrect.');
        return;
    }
    
    console.log(req.params.id);
    
    //---get the new user info---
    var user = {         
        username: req.body.username,
        password: req.body.password
    }

    var existingUser;

    conn.query('SELECT * FROM `UserDB`.`Users` WHERE username = ?', user.username, function (err,  res) {
        if (err) throw err;
        existingUser = res;
        console.log(res);
    })
    //conn.end();
    //    res.send(rows);
    //      })
    
    //---check if user exists---
    //---if user already exists, then modify user---
    if (existingUser) {
        //---modify the appropriate user in the users dictionary---
        existingUser.username = user.username;
        existingUser.password = user.password;        
    } else {
        //---else insert a new user---
        users[req.params.id] = user;    
    }    
    //---send back the users dictionary to the client---
    res.send(users);
});

//---as Javascript's sort() function sorts alphabetically,
// you need this method to pass into sort()
// to sort numbers correctly---
function sortNumber(a,b) {
    //---returns either +, -, or 0---
    return a - b;
}

app.post('/users/', function(req, res) {    
    //---check that both username and password fields are there---
    if (!req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('password')) {
        res.statusCode = 400;
        res.send('Error 400: Post syntax incorrect.');
        return;
    }
    
    //---get the new user info---
    var user = {         
        username: req.body.username,
        password: req.body.password
    }
    
    //---get the last id of the user in users---
    var lastId = (Object.keys(users).map(Number)).sort(sortNumber).reverse()[0];
    console.log(lastId);
    //---insert a new user---
    users[parseInt(lastId) + 1] = user;    
        
    //---send back the users dictionary to the client---
    res.send(users);
});

//---------------DELETE--------------------
//=======================================
app.delete('/users/:id', function(req, res) {    
    //---check if user exists---
    //---if user already exists, then delete user---
    var existingUser = users[req.params.id];    
    if (existingUser) {
        //---delete the user in the users dictionary---
        delete users[req.params.id];
    } else {
        //---error---
        res.statusCode = 404;
        res.send('Error 404: No user found');
        return;
    }
    //---send back the users dictionary to the client---
    res.send(users);
});

app.listen(8080);
console.log('Rest Service Listening on port 8080');
