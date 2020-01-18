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

app.get('/inventory', (req, res) => {
    mysqlConnection.query('SELECT * FROM Items', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});


app.get('/inventory/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM Items WHERE ItemID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});


app.delete('/inventory/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM Items WHERE ItemID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});


app.post('/inventory', (req, res) => {
    let itm = req.body;
    var sql = "SET @ItemID = ?;SET @Name = ?;SET @Quantity = ?;SET @Amount = ?; \
    CALL ItemAddOrUpdate(@ItemID,@Name,@Quantity,@Amount);";
    mysqlConnection.query(sql, [itm.ItemID, itm.Name, itm.Quantity, itm.Amount], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Inserted item ID : ' + element[0].ItemID);
            });
        else
            console.log(err);
    })
});


app.put('/inventory', (req, res) => {
    let itm = req.body;
    var sql = "SET @ItemID = ?;SET @Name = ?;SET @Quantity = ?;SET @Amount = ?; \
    CALL ItemAddOrUpdate(@ItemID,@Name,@Quantity,@Amount);";
    mysqlConnection.query(sql, [itm.ItemID, itm.Name, itm.Quantity, itm.Amount], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});