const mysql = require('mysql');
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'tumpang',
    protocol: 'tcp',
    port: '3306'
});

module.exports = {
    connection: connection
}