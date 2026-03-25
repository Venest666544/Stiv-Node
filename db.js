const mysql = require('mysql2');

// Usamos variables de entorno (process.env) para la nube
// Si no existen usará los valores por defecto tras el "||"
const conexion = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'notas_db',
    port: process.env.DB_PORT || 3306
});

conexion.connect((err) => {
    if (err) {
        console.error("❌ Error de conexión:", err.message);
        return;
    }
    console.log("✅ Conectado a la Base de Datos MySQL");
});

module.exports = conexion;