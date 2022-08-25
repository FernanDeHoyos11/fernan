const mysql = require('mysql');
 require('./config');
 require('./config')

var PORT = process.env.PORT || 3030
var DB_NAME = process.env.DB_NAME || 'semestre'
var DB_USERNAME = process.env.DB_USERNAME || 'root'
var DB_PASSWORD = process.env.DB_PASSWORD || ''
var DB_HOST = process.env.DB_HOST || 'localhost'
var DB_PORT = process.env.DB_PORT || 3306  
    
    
module.exports = () => {
  return mysql.createConnection({
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: Number (DB_PORT),
  });
}
