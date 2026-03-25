const express = require("express");
const bodyParser = require("body-parser");
const conexion = require("./db.js");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Ruta principal
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// Ruta para guardar notas
app.post("/guardar", (req, res) => {
    const nombre = req.body.nombre;
    const n1 = parseFloat(req.body.n1);
    const n2 = parseFloat(req.body.n2);
    const n3 = parseFloat(req.body.n3);

    if (!nombre || [n1, n2, n3].some(n => isNaN(n) || n < 1 || n > 5)) {
        return res.sendFile(__dirname + "/public/error.html");
    }

    const promedio = ((n1 + n2 + n3) / 3).toFixed(2);
    const estado = promedio >= 3 ? "Aprobado" : "Reprobado";

    const sql = "INSERT INTO estudiantes (nombre, nota1, nota2, nota3, promedio, estado) VALUES (?,?,?,?,?,?)";
    conexion.query(sql, [nombre, n1, n2, n3, promedio, estado], (err) => {
        if (err) throw err;
        res.redirect("/listar");
    });
});

// Ruta para listar estudiantes
app.get("/listar", (req, res) => {
    res.sendFile(__dirname + "/public/listar.html");
});

// API para obtener estudiantes como JSON
app.get("/api/estudiantes", (req, res) => {
    conexion.query("SELECT * FROM estudiantes ORDER BY id DESC", (err, filas) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(filas);
    });
});

// Estadisticas
app.get("/api/estadisticas", (req, res) => {
    const sql = `
        SELECT 
            COUNT(*) AS total,
            SUM(estado = 'Aprobado') AS aprobados,
            SUM(estado = 'Reprobado') AS reprobados,
            ROUND(AVG(promedio), 2) AS promedio_general,
            MAX(promedio) AS nota_maxima,
            MIN(promedio) AS nota_minima
        FROM estudiantes
    `;
    conexion.query(sql, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows[0]);
    });
});

// Ruta de estadísticas
app.get("/estadisticas", (req, res) => {
    res.sendFile(__dirname + "/public/estadisticas.html");
});

// Eliminar estudiante
app.post("/eliminar/:id", (req, res) => {
    const id = req.params.id;
    conexion.query("DELETE FROM estudiantes WHERE id = ?", [id], (err) => {
        if (err) throw err;
        res.redirect("/listar");
    });
});

app.listen(PORT, () => console.log(`🚀 Servidor ejecutando en http://localhost:${PORT}`));