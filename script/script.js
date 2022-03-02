const API_URL = 'https://rickandmortyapi.com/api/character/';
const SEARCH_URL = 'https://rickandmortyapi.com/api/character/?name=';

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.querySelector('#main');

const getcharacters = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.results.length === 0) {
      Swal.fire({
        title: 'Error!',
        text: 'No se ha encontrado El Personaje!!!',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    } else {
      showcharacters(data.results);
      console.log(data.results);
    }
  } catch (error) {
    Swal.fire({
      title: 'Error!',
      text: 'No se ha encontrado la pelicula!!!',
      icon: error,
      confirmButtonText: 'Aceptar',
    });
  }
};

getcharacters(API_URL);

const showcharacters = (characters) => {
  main.innerHTML = '';
  characters.forEach((character) => {
    const { name, image, id, species, gender, location } = character;
    const characterDiv = document.createElement('div');
    characterDiv.classList.add('movie');
    characterDiv.innerHTML = `
    <img src="${image}" alt="">
    <div class="movie-info">
    <h3>${name}</h3>
    <span class="green">${id}</span>
    </div>
    <div class="overview">
    <h3>Especie: ${species}</h3>
    <h3>Genero: ${gender}</h3>
    <h3>Ubicación: ${location.name}</h3>
    </div>
    `;

    main.appendChild(characterDiv);
  });
};

form.addEventListener('submit', (e) => {
  e.preventDefault(); //lapagina no se recarga
  const searchTerm = search.value.toLowerCase();
  if (searchTerm && searchTerm !== '') {
    getcharacters(SEARCH_URL + searchTerm);
    search.value = '';
  } else {
    Swal.fire({
      title: 'Error!',
      text: 'Debes Escribir algo!!!',
      icon: 'error',
      confirmButtonText: 'Aceptar',
    });
  }
});
