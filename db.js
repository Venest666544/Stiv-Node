const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Exportamos el "pool" para que server.js lo use
module.exports = pool;

conexion.connect((err) => {
    if (err) {
        console.error("❌ Error de conexión:", err.message);
        return;
    }
    console.log("✅ Conectado a la Base de Datos MySQL");
});

module.exports = conexion;