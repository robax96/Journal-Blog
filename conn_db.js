const mysql = require('mysql')

const pool = mysql.createPool({
    host: '', // Replace with your host name
    user: '',      // Replace with your database username
    password: '',      // Replace with your database password
    database: '' // // Replace with your database Name
}); 

module.exports = pool
