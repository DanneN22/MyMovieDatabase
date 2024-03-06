const omdbApiKey = "1e9fa8ff"; // Lägg till din API-nyckel här
const moviesApiUrl = `http://www.omdbapi.com/?apikey=${omdbApiKey}`;

document.getElementById("searchButton").addEventListener("click", searchMovies);

async function searchMovies() {
    const searchInput = document.getElementById("searchInput").value;
    console.log(searchInput);
    const response = await fetch(`${moviesApiUrl}&s=${searchInput}`);
    const data = await response.json();

    if (data.Response === "True") {
        displayMovies(data.Search, "main"); // Uppdatera mainContent till "main"
    } else {
        alert("No movies found!");
    }
}

function displayMovies(movies, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ""; // Clear previous results

    movies.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");


        const title = document.createElement("h2");
        title.textContent = movie.Title;

        const poster = document.createElement("img");
        poster.src = movie.Poster;
        poster.alt = movie.Title + " poster";

        const imdbLink = document.createElement("a");
        imdbLink.textContent = "IMDB Link";
        imdbLink.href = `https://www.imdb.com/title/${movie.imdbID}`;
        imdbLink.target = "_blank";

        movieCard.appendChild(title);
        movieCard.appendChild(poster);
        movieCard.appendChild(imdbLink);

        container.appendChild(movieCard);
    });
}


// Funktion för att slumpmässigt välja 5 filmer
function getRandomMovies(movies, num) {
    const randomMovies = [];
    const indices = new Set();

    while (randomMovies.length < num) {
        const index = Math.floor(Math.random() * movies.length);
        if (!indices.has(index)) {
            indices.add(index);
            randomMovies.push(movies[index]);
        }
    }

    return randomMovies;
}

// Visa 5 slumpmässiga trailers
//const randomMovies = getRandomMovies(movies, 5);
//displayMovies(randomMovies, "randomMoviesContainer");

// Visa topplistan för IMDBs 20 högst rankade filmer
//const top20Movies = movies.slice(0, 20);
//displayMovies(top20Movies, "topMoviesContainer");


//'use strict';

const filmArray = [];

async function fetchFilmData(filmApiString) {
    console.log('fetchFilmData()');
    
    try {
        const response = await fetch('https://santosnr6.github.io/Data/movies.json');
        const data = await response.json();
        return data;
    } catch(error) {
        console.log(error);
        return null;
    }
}

async function program() {
    const films = await fetchFilmData('https://santosnr6.github.io/Data/movies.json');
    console.log(films);

    films.forEach(film => filmArray.push(film));

    var randommovies = getRandomMovies(filmArray, 5)


    const firstFilm = await fetchFilmData(filmArray[0].url);

    console.log(firstFilm);
    const mainRef = document.querySelector('main');

    //firstFilm.actors.forEach(actor => {
    //    const pRef = document.createElement('p');
    //    pRef.textContent = actor.name;
    //    mainRef.appendChild(pRef);
    //});

    // filmArray.forEach(film => {
    //     const pRef = document.createElement('p');
    //     pRef.textContent = film.title;
    //     mainRef.appendChild(pRef);
    // })
}

program();
// Funktion för att skapa HTML-element för en film och lägga till det i DOM
function renderFilm(film) {
    const mainRef = document.querySelector('main');

    const filmContainer = document.createElement('div');
    filmContainer.classList.add('film-container');

    const titleElement = document.createElement('h2');
    titleElement.textContent = film.title;
    filmContainer.appendChild(titleElement);

    const posterImage = document.createElement('img');
    posterImage.src = film.poster;
    filmContainer.appendChild(posterImage);

    const trailerLink = document.createElement('a');
    trailerLink.textContent = 'Watch Trailer';
    trailerLink.href = film.trailer_link;
    trailerLink.target = '_blank';
    filmContainer.appendChild(trailerLink);

    mainRef.appendChild(filmContainer);
}

// Funktion för att visa alla filmer
function displayFilms(films) {
    films.forEach(film => {
        renderFilm(film);
    });
}

// Funktion för att söka filmer baserat på titel
function searchFilms(films, query) {
    return films.filter(film => film.title.toLowerCase().includes(query.toLowerCase()));
}

// Funktion för att hantera sökning och uppdatera gränssnittet med resultaten
function handleSearch(films) {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        const searchResults = searchFilms(films, query);
        clearMain();
        displayFilms(searchResults);
    });
}

// Funktion för att rensa huvudinnehållet
function clearMain() {
    const mainRef = document.querySelector('main');
    mainRef.innerHTML = '';
}

// Huvudprogrammet för att hämta filmer och visa dem på sidan
async function program() {
    try {
        const films = await fetchFilms(); // Funktion för att hämta filmdata från API
        displayFilms(films); // Visa alla filmer på sidan
        handleSearch(films); // Aktivera sökfunktionalitet
    } catch (error) {
        console.error('Error fetching films:', error);
    }
}

// Kör huvudprogrammet när sidan har laddats
window.addEventListener('DOMContentLoaded', program);
