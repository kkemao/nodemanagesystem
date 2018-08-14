var mysql = require('mysql');
var $IF = require('./config');
var pool = mysql.createPool({
    host: $IF.mysql.host,
    user: $IF.mysql.user,
    password: $IF.mysql.password,
    database: $IF.mysql.database
});

var db = {
    do: (sql, callback) => {
        pool.getConnection((err, connection) => {
            connection.query(sql, (err, rows) => {
                callback(err, rows);
                connection.release();
            });
        });
    },
    dowith: (sql, params, callback) => {
        pool.getConnection((err, connection) => {
            connection.query(sql, params, (err, rows) => {
                callback(err, rows);
                connection.release();
            });
        });
    },
    doPromise: sql => {
        return new Promise((resolve, reject) => {
            try{
                pool.getConnection((err, connection) => {
                    connection.query(sql, (err, rows) => {
                        resolve(rows);
                        connection.release();
                    });
                });
            }catch(err){
                reject(err);
            }
        });
    },
    dowithPromise: (sql, params) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(sql, params, (err, rows) => {
                    resolve(err, rows);
                    connection.release();
                });
            });
        });
    }
}

module.exports = db;
