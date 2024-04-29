const provinciasDropdown = document.getElementById('provincias');
const municipiosDropdown = document.getElementById('municipios');
const climaDiv = document.getElementById('clima');

fetch('https://www.el-tiempo.net/api/json/v2/provincias')
    .then(response => response.json())
    .then(data => {
        if (data.provincias) {
            data.provincias.forEach(provincia => {
                const option = document.createElement('option');
                option.text = provincia.NOMBRE_PROVINCIA;
                option.value = provincia.CODPROV;
                provinciasDropdown.add(option);
            });
        } else {
            console.error('Los datos de las provincias no están en el formato esperado:', data);
        }
    })
    .catch(error => console.error('Error al cargar las provincias:', error));

function cargarMunicipios() {
    const selectedProvincia = provinciasDropdown.value;
    if (!selectedProvincia) return;

    municipiosDropdown.innerHTML = '<option value="" selected disabled>Cargando...</option>';

    fetch(`https://www.el-tiempo.net/api/json/v2/provincias/${selectedProvincia}/municipios`)
        .then(response => response.json())
        .then(data => {
            if (data.municipios) {
                municipiosDropdown.innerHTML = '';
                data.municipios.forEach(municipio => {
                    const option = document.createElement('option');
                    option.text = municipio.NOMBRE;
                    option.value = municipio.COD_GEO;
                    municipiosDropdown.add(option);
                });
            } else {
                console.error('Los datos de los municipios no están en el formato esperado:', data);
            }
            console.log('Municipios cargados:', data);
        })
        .catch(error => console.error('Error al cargar los municipios:', error));
}

function mostrarClima() {
    const selectedProvincia = provinciasDropdown.value;
    const selectedMunicipio = municipiosDropdown.value;
    console.log('selectedProvincia:', selectedProvincia);
    console.log('selectedMunicipio:', selectedMunicipio);
    if (!selectedProvincia || !selectedMunicipio) return;

    fetch(`https://corsproxy.io/?https://www.el-tiempo.net/api/json/v1/provincias/${selectedProvincia}/municipios/${selectedMunicipio}/weather`)
        .then(response => response.json())
        .then(data => {
            climaDiv.innerHTML = '';

            data.prediccion.dia.forEach(dia => {
                climaDiv.innerHTML += `<h3>Fecha: ${dia['@attributes'].fecha}</h3>`;
                climaDiv.innerHTML += `<p>Probabilidad de precipitación: ${dia.prob_precipitacion[0]}%</p>`;
                climaDiv.innerHTML += `<p>Estado del cielo: ${dia.estado_cielo[0]}</p>`;
                climaDiv.innerHTML += `<p>Temperatura Máxima: ${dia.temperatura.maxima} °C</p>`;
                climaDiv.innerHTML += `<p>Temperatura Mínima: ${dia.temperatura.minima} °C</p>`;
                climaDiv.innerHTML += `<p>Velocidad del viento: ${dia.viento[0].velocidad} km/h</p>`;
                climaDiv.innerHTML += `<p>Dirección del viento: ${dia.viento[0].direccion}</p>`;
                climaDiv.innerHTML += `<br>`;
            });
            console.log('Clima cargado:', data);
        })
        .catch(error => console.error('Error al cargar el clima:', error));
}

function mostrarClima() {
    const selectedProvincia = provinciasDropdown.value;
    const selectedMunicipio = municipiosDropdown.value;
    console.log('selectedProvincia:', selectedProvincia);
    console.log('selectedMunicipio:', selectedMunicipio);
    if (!selectedProvincia || !selectedMunicipio) return;

    fetch(`https://corsproxy.io/?https://www.el-tiempo.net/api/json/v1/provincias/${selectedProvincia}/municipios/${selectedMunicipio}/weather`)
        .then(response => response.json())
        .then(data => {
            const tablaClima = document.getElementById('tabla-clima');
            tablaClima.getElementsByTagName('tbody')[0].innerHTML = '';

            data.prediccion.dia.forEach(dia => {
                const fila = `
                    <tr>
                        <td>${dia['@attributes'].fecha}</td>
                        <td>${dia.prob_precipitacion[0]}%</td>
                        <td>${dia.estado_cielo[0]}</td>
                        <td>${dia.temperatura.maxima} °C</td>
                        <td>${dia.temperatura.minima} °C</td>
                        <td>${dia.viento[0].velocidad} km/h</td>
                        <td>${dia.viento[0].direccion}</td>
                    </tr>
                `;
                tablaClima.getElementsByTagName('tbody')[0].insertAdjacentHTML('beforeend', fila);
            });

            console.log('Clima cargado:', data);
        })
        .catch(error => console.error('Error al cargar el clima:', error));
    }


