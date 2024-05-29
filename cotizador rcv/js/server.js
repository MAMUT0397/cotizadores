const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/clientes', { useNewUrlParser: true, useUnifiedTopology: true });

// Crear un esquema y un modelo para los datos del cliente
const clienteSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    sexo: String,
    fechaNacimiento: String,
    tipo: String,
    cedula: String,
    telefono: String,
    edad: Number,
    marca: String,
    modelo: String,
    version: String,
    tipoVehiculo: String,
    ocupantes: Number,
    ano: String,
    exceso: String,
    defensaPenal: String,
    apov: String
});

const Cliente = mongoose.model('Cliente', clienteSchema);

// Ruta para recibir los datos del cliente
app.post('/api/clientes', async (req, res) => {
    try {
        const cliente = new Cliente(req.body);
        await cliente.save();
        res.status(201).send(cliente);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
