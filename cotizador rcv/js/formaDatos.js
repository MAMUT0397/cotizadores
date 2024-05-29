document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('cotizarCoberturas').addEventListener('click', async () => {
        const datos = {
            nombre: document.getElementById('Nombre').value,
            apellido: document.getElementById('apellido').value,
            // sexo: document.querySelector('input[name="sexo"]:checked').value,
            fenaci: document.getElementById('fenaci').value,
            tipo: document.getElementById('tipo').value,
            cedulaRif: document.getElementById('Cedula/rif').value,
            telefono: document.getElementById('ntlf').value,
            // edad: document.getElementById('Edad').value,
            marca: document.getElementById('marca').value,
            modelo: document.getElementById('modelo').value,
            version: document.getElementById('version').value,
            tipoVehiculo: document.getElementById('tipo-vehiculo').value,
            ocupantes: document.getElementById('ocupantes').value,
            ano: document.getElementById('ano').value,
            exceso: document.getElementById('exceso').value,
            defensaPenal: document.getElementById('defensapenal').value,
            apov: document.getElementById('apov').value,
        };
        console.log('Datos enviados:', datos)

        const response = await fetch('/guardar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        const result = await response.text();
        alert(result);
    });
});
