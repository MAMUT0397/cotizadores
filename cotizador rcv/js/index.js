
//lista de marcas 

document.addEventListener("DOMContentLoaded", function() {
    fetch('./datos/marca.json')
        .then(response => response.json())
        .then(data => {
            let marcaSelect = document.getElementById('marca');
            if (Array.isArray(data)) {
                data.forEach(marcaObj => {
                    if (marcaObj && marcaObj.marca) {
                        let option = document.createElement('option');
                        option.value = marcaObj.marca;
                        option.text = marcaObj.marca;
                        marcaSelect.appendChild(option);
                    }
                });
            }
        })
        .catch(error => console.error('Error fetching the JSON:', error));
});

// lista/modelos

document.addEventListener("DOMContentLoaded", function() {
    fetch('./datos/marca-modelo.json')
        .then(response => response.json())
        .then(data => {
            let marcaSelect = document.getElementById('marca');
            let modeloSelect = document.getElementById('modelo');
            let marcasModelos = {};

            data.forEach(item => {
                if (!marcasModelos[item.marca]) {
                    marcasModelos[item.marca] = [];
                }
                marcasModelos[item.marca].push(item.modelo);
            });

            marcaSelect.addEventListener('change', function() {
                let selectedMarca = this.value;
                let modelos = marcasModelos[selectedMarca];

                modeloSelect.innerHTML = '<option value=""></option>';

                if (modelos) {
                    modelos.forEach(modelo => {
                        let option = document.createElement('option');
                        option.value = modelo;
                        option.text = modelo;
                        modeloSelect.appendChild(option);
                    });
                }
            });

            marcaSelect.dispatchEvent(new Event('change'));
        })
        .catch(error => console.error('Error fetching the JSON:', error));
});

// lista version

document.addEventListener("DOMContentLoaded", function() {
    fetch('./datos/marca-modelo-version-tipo.json')
        .then(response => response.json())
        .then(data => {
            let marcaSelect = document.getElementById('marca');
            let modeloSelect = document.getElementById('modelo');
            let versionSelect = document.getElementById('version');
            let tipoVehiculoInput = document.getElementById('tipo-vehiculo');
            let marcasModelos = {};

            data.forEach(item => {
                if (!marcasModelos[item.MARCA]) {
                    marcasModelos[item.MARCA] = {};
                }
                if (!marcasModelos[item.MARCA][item.MODELO]) {
                    marcasModelos[item.MARCA][item.MODELO] = {};
                }
                if (!marcasModelos[item.MARCA][item.MODELO][item.VERSION]) {
                    marcasModelos[item.MARCA][item.MODELO][item.VERSION] = [];
                }
                marcasModelos[item.MARCA][item.MODELO][item.VERSION].push(item.TIPO);
            });

            marcaSelect.addEventListener('change', function() {
                let selectedMarca = this.value;
                let modelos = Object.keys(marcasModelos[selectedMarca]);

                modeloSelect.innerHTML = '<option value=""></option>';
                versionSelect.innerHTML = '<option value=""></option>';
                tipoVehiculoInput.value = '';

                if (modelos) {
                    modelos.forEach(modelo => {
                        let option = document.createElement('option');
                        option.value = modelo;
                        option.text = modelo;
                        modeloSelect.appendChild(option);
                    });
                }

                modeloSelect.dispatchEvent(new Event('change'));
            });

            modeloSelect.addEventListener('change', function() {
                let selectedMarca = marcaSelect.value;
                let selectedModelo = this.value;
                let versiones = Object.keys(marcasModelos[selectedMarca][selectedModelo]);

                versionSelect.innerHTML = '<option value=""></option>';
                tipoVehiculoInput.value = '';

                if (versiones) {
                    versiones.forEach(version => {
                        let option = document.createElement('option');
                        option.value = version;
                        option.text = version;
                        versionSelect.appendChild(option);
                    });
                }

                versionSelect.dispatchEvent(new Event('change'));
            });

            versionSelect.addEventListener('change', function() {
                let selectedMarca = marcaSelect.value;
                let selectedModelo = modeloSelect.value;
                let selectedVersion = this.value;
                let tipos = marcasModelos[selectedMarca][selectedModelo][selectedVersion];

                tipoVehiculoInput.value = tipos ? tipos[0] : '';
            });

            marcaSelect.dispatchEvent(new Event('change'));
        })
        .catch(error => console.error('Error fetching the JSON:', error));
});





// agregamos la lista de a;os

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const res = await fetch('./datos/años.json'); 
        const dataAños = await res.json();
        let añoSelect = document.getElementById('ano');

        if (Array.isArray(dataAños)) {
            dataAños.forEach(anoObj => {
                if (anoObj && anoObj.años) {
                    let option = document.createElement('option');
                    option.value = anoObj.años;
                    option.text = anoObj.años;
                    añoSelect.appendChild(option);
                }
            });
        }
    } catch (error) {
        console.error('Error al cargar datos:', error);
    }
});




//suma asegurada de exceso
document.addEventListener("DOMContentLoaded", function () {
    fetch('./datos/tasaexceso.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            let excesoSelect = document.getElementById('exceso');
            if (!Array.isArray(data)) {
                console.error('Error: el JSON no es una lista/array.');
                return;
            }
            data.forEach(excesoObj => {
                if (!excesoObj || !excesoObj["SUMA ASEGURADA "]) { 
                    console.error('Error: Formato de objeto incorrecto ', excesoObj);
                    return;
                }
                let option = document.createElement('option');
                option.value = excesoObj["SUMA ASEGURADA "];
                option.text = excesoObj["SUMA ASEGURADA "]; 
                excesoSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching the JSON:', error));
});

// suma asegurada defensa penal 
document.addEventListener("DOMContentLoaded", function () {
    fetch('./datos/defensapenal.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            let defensaSelect = document.getElementById('defensapenal');
            if (!Array.isArray(data)) {
                console.error('Error: el JSON no es una lista/array.');
                return;
            }
            data.forEach(defensaObj => {
                if (!defensaObj || !defensaObj["SUMA ASEGURADA"]) { // Corrección aquí
                    console.error('Error: Formato de objeto incorrecto ', defensaObj);
                    return;
                }
                let option = document.createElement('option');
                option.value = defensaObj["SUMA ASEGURADA"]; // Corrección aquí
                option.text = defensaObj["SUMA ASEGURADA"]; // Corrección aquí
                defensaSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching the JSON:', error));
});


// suma asegurada apov 
document.addEventListener("DOMContentLoaded", function () {
    fetch('./datos/apov.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            let apovSelect = document.getElementById('apov');
            if (!Array.isArray(data)) {
                console.error('Error: el JSON no es una lista/array.');
                return;
            }
            data.forEach(apovObj => {
                if (!apovObj || !apovObj["SUMA ASEGURADA"]) {
                    console.error('Error: Formato de objeto incorrecto ', apovObj);
                    return;
                }
                let option = document.createElement('option');
                option.value = apovObj["SUMA ASEGURADA"];
                option.text = apovObj["SUMA ASEGURADA"];
                apovSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching the JSON:', error));
});


document.getElementById('cotizarCoberturas').addEventListener('click', async () => {
    const clienteData = {
        nombre: document.getElementById('Nombre').value,
        apellido: document.getElementById('apellido').value,
        sexo: document.querySelector('input[name="sexo"]:checked').id,
        fechaNacimiento: document.getElementById('fenaci').value,
        tipo: document.getElementById('tipo').value,
        cedula: document.getElementById('Cedula/rif').value,
        telefono: document.getElementById('ntlf').value,
        // Asumimos que la edad se calcula en el frontend y se guarda en un campo de edad.
        edad: parseInt(document.getElementById('Edad').value) || null,
        marca: document.getElementById('marca').value,
        modelo: document.getElementById('modelo').value,
        version: document.getElementById('version').value,
        tipoVehiculo: document.getElementById('tipo-vehiculo').value,
        ocupantes: parseInt(document.getElementById('ocupantes').value),
        ano: document.getElementById('ano').value,
        exceso: document.getElementById('exceso').value,
        defensaPenal: document.getElementById('defensapenal').value,
        apov: document.getElementById('apov').value
    };

    try {
        const response = await fetch('http://localhost:3000/api/clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clienteData)
        });
        if (response.ok) {
            const result = await response.json();
            console.log('Datos guardados:', result);
        } else {
            console.error('Error al guardar los datos');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
