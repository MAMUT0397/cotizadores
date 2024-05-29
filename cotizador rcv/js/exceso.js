


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
