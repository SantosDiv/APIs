const mysql = require('mysql');

const conexao = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'SHALOM_natal2401',
    database: 'agenda-petshop',
});

module.exports = conexao;