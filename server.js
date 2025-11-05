const express = require('express');
const app = express();
const port = 3000;

app.use(express.static(__dirname)); // Sirve archivos estáticos
app.use(express.json());

app.post('/validate', (req, res) => {
    const { code, problem } = req.body;
    // Validación simple (expande con lógica para algoritmos)
    let valid = false;
    if (problem.includes('Suma') && (code.includes('+') || code.includes('suma'))) {
        valid = true;
    }
    res.json({ valid });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});