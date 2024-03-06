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
        
        console.log("GÖR NÅT")
    } else {
        alert("No movies found!");
    }
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