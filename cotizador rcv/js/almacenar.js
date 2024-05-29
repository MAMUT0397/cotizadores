let datosCapturados = {};

function actualizarDatosCapturados(id, valor) {
    datosCapturados[id] = valor;
    console.log(`${id}: ${valor}`);
    console.log(datosCapturados);
}

// Datos del Solicitante
let nombre = document.getElementById("Nombre");
nombre.addEventListener("change", function () {
    actualizarDatosCapturados('nombre', nombre.value);
});

let apellido = document.getElementById("apellido");
apellido.addEventListener("change", function () {
    actualizarDatosCapturados('apellido', apellido.value);
});

let fechaNaci = document.getElementById("fenaci");
fechaNaci.addEventListener("change", function () {
    actualizarDatosCapturados('fechaNacimiento', fechaNaci.value);
});

let tipoDocu = document.getElementById("tipo");
tipoDocu.addEventListener("change", function () {
    actualizarDatosCapturados('tipoDocumento', tipoDocu.value);
});

let numDocu = document.getElementById("Cedula/rif");
numDocu.addEventListener("change", function () {
    actualizarDatosCapturados('cedulaRif', numDocu.value);
});

let numTelf = document.getElementById("ntlf");
numTelf.addEventListener("change", function () {
    actualizarDatosCapturados('telefono', numTelf.value);
});

document.querySelectorAll('input[name="sexo"]').forEach((input) => {
    input.addEventListener('change', function () {
        if (input.checked) {
            actualizarDatosCapturados('sexo', input.value);
        }
    });
});

// Información del Vehículo
let listaMarca = document.getElementById("marca");
listaMarca.addEventListener("change", function () {
    actualizarDatosCapturados('marca', listaMarca.value);
});

let datoModelo = document.getElementById("modelo");
datoModelo.addEventListener("change", function () {
    actualizarDatosCapturados('modelo', datoModelo.value);
});

let datoVersion = document.getElementById("version");
datoVersion.addEventListener("change", function () {
    actualizarDatosCapturados('version', datoVersion.value);
});

let tipoVehiculo = document.getElementById("tipo-vehiculo");
tipoVehiculo.addEventListener("change", function () {
    actualizarDatosCapturados('tipoVehiculo', tipoVehiculo.value);
});

let ocupantes = document.getElementById("ocupantes");
ocupantes.addEventListener("change", function () {
    actualizarDatosCapturados('ocupantes', ocupantes.value);
});

let ano = document.getElementById("ano");
ano.addEventListener("change", function () {
    actualizarDatosCapturados('ano', ano.value);
});

// Coberturas
let exceso = document.getElementById("exceso");
exceso.addEventListener("change", function () {
    actualizarDatosCapturados('exceso', exceso.value);
    fetchAndLogValue();
});

let defensapenal = document.getElementById("defensapenal");
defensapenal.addEventListener("change", function () {
    actualizarDatosCapturados('defensaPenal', defensapenal.value);
    fetchAndLogDefensaPenal();
});

let apov = document.getElementById("apov");
apov.addEventListener("change", function () {
    actualizarDatosCapturados('apov', apov.value);
    fetchAndLogapov();
});

let primaExceso;
let primaDefensaPenal;
let primaApoVMuerte;
let primaApoVInvalidez;
let primaApoVGastosMedicos;
let primaGastosFunerarios;

function fetchAndLogValue() {
    const sumaAsegurada = parseInt(document.getElementById('exceso').value);
    const tipoVehiculo = document.getElementById('tipo-vehiculo').value;

    if (isNaN(sumaAsegurada) || !tipoVehiculo) {
        console.log('Por favor, selecciona una suma asegurada y escribe un tipo de vehículo válido.');
        return;
    }

    fetch("./datos/tasaexceso.json")
        .then(response => response.json())
        .then(data => {
            const resultado = data.find(item => item["SUMA ASEGURADA "] === sumaAsegurada);

            if (resultado) {
                const valor = resultado[tipoVehiculo];
                if (valor !== undefined) {
                    console.log(`Suma Asegurada: ${sumaAsegurada}, Tipo de Vehículo: ${tipoVehiculo}, Valor: ${valor}`);
                    primaExceso = valor;
                    actualizarDatosCapturados('primaExceso', primaExceso);
                } else {
                    console.log(`Tipo de vehículo: ${tipoVehiculo} no encontrado en la suma asegurada: ${sumaAsegurada}.`);
                }
            } else {
                console.log(`Suma Asegurada: ${sumaAsegurada} no encontrada.`);
            }
        })
        .catch(error => {
            console.error('Error al cargar el JSON:', error);
        });
}

function fetchAndLogDefensaPenal() {
    const sumaAsegurada = parseInt(document.getElementById('defensapenal').value);

    if (isNaN(sumaAsegurada)) {
        console.log('Por favor, selecciona una suma asegurada válida.');
        return;
    }

    fetch('./datos/defensapenal.json')
        .then(response => response.json())
        .then(data => {
            const resultado = data.find(item => item["SUMA ASEGURADA"] === sumaAsegurada);

            if (resultado) {
                const prima = resultado["PRIMA"];
                console.log(`Suma Asegurada: ${sumaAsegurada}, Prima: ${prima}`);
                primaDefensaPenal = prima;
                actualizarDatosCapturados('primaDefensaPenal', primaDefensaPenal);
            } else {
                console.log(`Suma Asegurada: ${sumaAsegurada} no encontrada.`);
            }
        })
        .catch(error => {
            console.error('Error al cargar el JSON:', error);
        });
}

function fetchAndLogapov() {
    const sumaAsegurada = parseInt(document.getElementById('apov').value);
    const ocupantes = parseInt(document.getElementById('ocupantes').value);

    if (isNaN(sumaAsegurada)) {
        console.log('Por favor, selecciona una suma asegurada válida.');
        return;
    }

    if (isNaN(ocupantes)) {
        console.log('Por favor, ingresa un número válido de ocupantes.');
        return;
    }

    fetch('./datos/apov.json')
        .then(response => response.json())
        .then(data => {
            const resultado = data.find(item => item["SUMA ASEGURADA"] === sumaAsegurada);

            if (resultado) {
                primaApoVMuerte = resultado["O.V MUERTE"] * ocupantes;
                primaApoVInvalidez = resultado["O.V INVALIDEZ"] * ocupantes;
                primaApoVGastosMedicos = resultado["O.V GASTOS MÉDICOS"] * ocupantes;
                primaGastosFunerarios = resultado["GASTOS FUNERARIOS"] * ocupantes;

                actualizarDatosCapturados('primaApoVMuerte', primaApoVMuerte);
                actualizarDatosCapturados('primaApoVInvalidez', primaApoVInvalidez);
                actualizarDatosCapturados('primaApoVGastosMedicos', primaApoVGastosMedicos);
                actualizarDatosCapturados('primaGastosFunerarios', primaGastosFunerarios);

                console.log(`Suma Asegurada: ${sumaAsegurada}, O.V MUERTE: ${primaApoVMuerte}, O.V INVALIDEZ: ${primaApoVInvalidez}, O.V GASTOS MÉDICOS: ${primaApoVGastosMedicos}, GASTOS FUNERARIOS: ${primaGastosFunerarios}`);
            } else {
                console.log(`Suma Asegurada: ${sumaAsegurada} no encontrada.`);
            }
        })
        .catch(error => {
            console.error('Error al cargar el JSON:', error);
        });
}

console.log(datosCapturados);

