

//  calcular prima exceso
document.getElementById('exceso').addEventListener('change', fetchAndLogValue);
document.getElementById('tipo-vehiculo').addEventListener('input', fetchAndLogValue);

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
            // Busca el objeto que tiene la suma asegurada especificada
            const resultado = data.find(item => item["SUMA ASEGURADA "] === sumaAsegurada);

            if (resultado) {
                // Obtiene el valor correspondiente al tipo de vehículo seleccionado
                const valor = resultado[tipoVehiculo];
                if (valor !== undefined) {
                    console.log(`Suma Asegurada: ${sumaAsegurada}, Tipo de Vehículo: ${tipoVehiculo}, Valor: ${valor}`);
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
//calcular  prima defensa penal
document.getElementById('defensapenal').addEventListener('change', fetchAndLogDefensaPenal);

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
            } else {
                console.log(`Suma Asegurada: ${sumaAsegurada} no encontrada.`);
            }
        })
        .catch(error => {
            console.error('Error al cargar el JSON:', error);
        });
}


//  calcular prima apov 

document.getElementById('apov').addEventListener('change', fetchAndLogapov);

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
                const ovMuerte = resultado["O.V MUERTE"] * ocupantes;
                const ovInvalidez = resultado["O.V INVALIDEZ"] * ocupantes;
                const ovGastosMedicos = resultado["O.V GASTOS MÉDICOS"] * ocupantes;
                const gastosFunerarios = resultado["GASTOS FUNERARIOS"] * ocupantes;

                console.log(`Suma Asegurada: ${sumaAsegurada}, O.V MUERTE: ${ovMuerte}, O.V INVALIDEZ: ${ovInvalidez}, O.V GASTOS MÉDICOS: ${ovGastosMedicos}, GASTOS FUNERARIOS: ${gastosFunerarios}`);
            } else {
                console.log(`Suma Asegurada: ${sumaAsegurada} no encontrada.`);
            }
        })
        .catch(error => {
            console.error('Error al cargar el JSON:', error);
        });
}
