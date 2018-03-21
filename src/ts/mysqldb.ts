import mysql = require("mysql");
export const connection = mysql.createConnection({
    database: "tumpang",
    host: "127.0.0.1",
    password: "",
    port: "3306",
    protocol: "tcp",
    user: "root",
});
