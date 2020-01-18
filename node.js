const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');

var app = express();
app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'inventory',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded');
    else
        console.log('DB connection failed');
});


app.listen(3000);
