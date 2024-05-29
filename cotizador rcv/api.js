
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const path = require('path');


app.use(express.json());
// mongoose.connect('mongodb+srv://fquero:26440007@cluster0.uuvaknb.mongodb.net/?retryWrites=true&w=majority&appName=cluster0')
mongoose.connect('mongodb+srv://fquero3497:26440007@cluster0.7kmkthz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
    console.log('Conectado a MongoDB');
});


const formularioSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    sexo: String,
    fenaci: String,
    tipo: String,
    cedulaRif: String,
    telefono: String,
    edad: Number,
    marca: String,
    modelo: String,
    version: String,
    tipoVehiculo: String,
    ocupantes: Number,
    ano: Number,
    exceso: Number,
    defensaPenal: Number,
    apov: Number
});

const Formulario = mongoose.model('Formulario', formularioSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/guardar', async (req, res) => {
    try {
        const datosFormulario = new Formulario(req.body);
        await datosFormulario.save();
        res.status(200).send('Datos guardados correctamente.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar los datos.');
    }
});



// Ruta para servir archivos estáticos desde la carpeta raíz
app.use(express.static(path.join(__dirname)));

// Ruta de inicio
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));
