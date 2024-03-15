const omdbApiKey = "1e9fa8ff"; // Lägg till din API-nyckel här
const moviesApiUrl = `http://www.omdbapi.com/?apikey=${omdbApiKey}`;
var filmArray = [];


document.getElementById("searchButton").addEventListener("click", () => search());

async function search() {
    const searchInput = document.getElementById("searchInput").value;
    //console.log(searchInput);
    const response = await fetch(`${moviesApiUrl}&s=${searchInput}`);
    const data = await response.json();

    if (data.Response === "True") {
        //Öppna ny sida med info'
        console.log(data.Search);

        displayResults(data.Search);
    } else {
        alert("No movies found!");
    }
}

function displayResults(movies) {
    document.querySelector('main').style.display = 'none';
    const resultsRef = document.querySelector('.results');
    resultsRef.innerHTML = ""
    //Istället för en p-tagg per film, skapa ett kort där Poster och titel syns.

    movies.forEach(movie => {
        const movieRef = document.createElement('p');
        movieRef.textContent = movie.Title;
        //movieRef.setAttribute('data-id', movie.imdbID);
        movieRef.dataset.id = movie.imdbID;
        resultsRef.appendChild(movieRef);

        // const cardTemplate = `
        //     <div class="card">
        //         <img src=${movie.Poster}>
        //         <h3>${movie.Title}</h3>
        //     </div>
        // `;

        movieRef.addEventListener('click', async (event) => {
            console.log(event.target.dataset.id);
            const response = await fetch(`${moviesApiUrl}&i=${event.target.dataset.id}&plot=full`);
            const data = await response.json();

            console.log(data);
            renderMovieDetails(data);
        });
    });
}

function hidedetails(){
    const resultsRef = document.querySelector('.results');
    resultsRef.style.display = "block"

    const detailsRef = document.querySelector('.details');
    detailsRef.style.display = "none"

    const back = document.getElementById("detailsbackbutton")
    back.style.display = "none"
}
function renderMovieDetails(movie) {
    //Göm sökresultaten
    //Visa den detaljerade informationen (minst 5 detaljer)
    

    const resultsRef = document.querySelector('.results');
    resultsRef.style.display = "none"

    const detailsRef = document.querySelector('.details');
    detailsRef.style.display = "block"

    detailsRef.innerHTML = ""
    
    const backbutton = document.createElement("button")
    backbutton.onclick = hidedetails
    backbutton.id="detailsbackbutton"
    backbutton.innerHTML = "Back"

    const detailsimg = document.createElement("img")
    detailsimg.src = movie.Poster

    const detailstitel = document.createElement("h2")
    detailstitel.innerText = "Titel: "+movie.Title

    const detailsReleased = document.createElement("h5")
    detailsReleased.innerText = "Released: "+movie.Released

    const detailsactors = document.createElement("h5")
    detailsactors.innerText = "Actors: "+movie.Actors

    const detailsplot = document.createElement("h5")
    detailsplot.innerText = "Plot: "+movie.Plot

    const detailscard = document.createElement('div');
    detailscard.className = "card"

    detailscard.appendChild(detailsimg)

    detailscard.appendChild(detailstitel)

    detailscard.appendChild(detailsplot)

    detailscard.appendChild(detailsactors)

    detailscard.appendChild(detailsReleased)

    detailsRef.appendChild(backbutton)

    detailsRef.appendChild(detailscard)

}


async function fetchFilmData(filmApiString) {
    console.log('fetchFilmData()');
    
    try {
        const response = await fetch(filmApiString);
        const data = await response.json();
        return data;
    } catch(error) {
        console.log(error);
        return null;
    }
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




const trailerSection = document.getElementById("randomMoviesContainer");
const topMoviesSection = document.getElementById("topMoviesContainer");
//https://www.youtube.com/embed/EXeTwQWrcwY

function accessMovie(id) {
    //console.log("aasaa")
    console.log("hej")
}

function initStart(vid) {
    filmArray.push(vid)
    title = document.createElement("h4")
    title.innerText = vid.title
  

    poster = document.createElement("img")
    poster.setAttribute("height", "250")
    poster.setAttribute("width", "250")
    poster.setAttribute("src", vid.poster)


    movie = document.createElement("div")

    //Lägg till vad som ska göras när man trycker på top 20
    movie.onclick = function(){
        console.log("hello")

    };
    movie.style.maxWidth = "250px"
    movie.style.cursor = "pointer"
    movie.style.marginBottom = "40px"

    movie.appendChild(poster)
    movie.appendChild(title)

    topMoviesSection.appendChild(movie)
}

function addToSection(vid) {
    _link = vid.trailer_link +"?autoplay=0&mute=0"
    trailer = document.createElement("iframe")
    trailer.setAttribute("width", "420")
    trailer.setAttribute("height", "315")
    trailer.setAttribute("src", _link)
    trailerSection.appendChild(trailer)

}


async function program() {
    const films = await fetchFilmData('https://santosnr6.github.io/Data/movies.json');
    console.log(films);

    films.forEach(film => initStart(film));

    var initTrailers = getRandomMovies(filmArray, 5)

    
    initTrailers.forEach(trailer => addToSection(trailer))
    

}



// Kör huvudprogrammet när sidan har laddats
window.addEventListener('DOMContentLoaded', program);