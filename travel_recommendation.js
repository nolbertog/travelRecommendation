
const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');
const resultDiv = document.getElementById('result'); 

function searchDestination() {
    const input = document.getElementById('searchInput').value.toLowerCase();

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            let destinations = [];

            if (input === 'beaches') {
                destinations = data.beaches;
            } else if (input === 'temples') {
                destinations = data.temples; 
            } else if (input === 'countries') {
                destinations = data.countries.flatMap(country => country.cities); 
            }

            if (destinations.length > 0) {
                resultDiv.innerHTML = ''; 
                destinations.forEach(dest => {
                    resultDiv.innerHTML += `<h2>${dest.name}</h2>`;
                    resultDiv.innerHTML += `<img src="${dest.imageUrl}" alt="${dest.name}">`;
                    resultDiv.innerHTML += `<p><strong>Description:</strong> ${dest.description}</p>`;
                    resultDiv.innerHTML += `<hr>`;
                });
            } else {
                resultDiv.innerHTML = 'No se encontraron recomendaciones para la palabra clave ingresada.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'Se produjo un error al obtener los datos.';
        });
}

function clearResults() {
    resultDiv.innerHTML = '';
}

btnSearch.addEventListener('click', searchDestination);
btnClear.addEventListener('click', clearResults);
