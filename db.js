const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'notas_Db'
});

conexion.connect((err) => {
    if (err) throw err;
    console.log("✅ Conectado a la Base de Datos MySQL");
});

module.exports = conexion;