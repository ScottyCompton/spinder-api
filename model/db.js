'user strict';

require('dotenv').config();
var mysql = require('mysql');


//local mysql db connection
var connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;