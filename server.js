const express = require("express");
const bodyParser = require("body-parser");
const conexion = require("./db.js");
const path = require("path"); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Ruta principal
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Ruta para guardar notas (CORREGIDA CON ASYNC/AWAIT)
app.post("/guardar", async (req, res) => {
    const { nombre, n1, n2, n3 } = req.body;
    const nota1 = parseFloat(n1);
    const nota2 = parseFloat(n2);
    const nota3 = parseFloat(n3);

    if (!nombre || [nota1, nota2, nota3].some(n => isNaN(n) || n < 1 || n > 5)) {
        return res.sendFile(path.join(__dirname, "public", "error.html"));
    }

    const promedio = ((nota1 + nota2 + nota3) / 3).toFixed(2);
    const estado = promedio >= 3 ? "Aprobado" : "Reprobado";
    const sql = "INSERT INTO estudiantes (nombre, nota1, nota2, nota3, promedio, estado) VALUES (?,?,?,?,?,?)";

    try {
        await conexion.query(sql, [nombre, nota1, nota2, nota3, promedio, estado]);
        res.redirect("/listar");
    } catch (err) {
        console.error("❌ Error en DB:", err);
        res.status(500).send("Error en la base de datos");
    }
});

// Ruta para listar estudiantes
app.get("/listar", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "listar.html"));
});

// API para obtener estudiantes (CORREGIDA)
app.get("/api/estudiantes", async (req, res) => {
    try {
        const [filas] = await conexion.query("SELECT * FROM estudiantes ORDER BY id DESC");
        res.json(filas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API Estadisticas (CORREGIDA)
app.get("/api/estadisticas", async (req, res) => {
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
    try {
        const [rows] = await conexion.query(sql);
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/estadisticas", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "estadisticas.html"));
});

// Eliminar estudiante (CORREGIDA)
app.post("/eliminar/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await conexion.query("DELETE FROM estudiantes WHERE id = ?", [id]);
        res.redirect("/listar");
    } catch (err) {
        res.status(500).send("Error al eliminar");
    }
});

app.listen(PORT, () => console.log(`🚀 Servidor listo en puerto ${PORT}`));