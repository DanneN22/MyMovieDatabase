try {
const searchInput = document.getElementById('searchInput').value;

const ApiUrl =  `http://www.omdbapi.com/?apikey=${encodeURIcomponent(searchInput)}`;

const response = await fetch (ApiUrl)
if (!response.ok) {
    throw new Error ('response was not ok');
}
const data = await response.json();
console.log(data);

const movies = data.search;

const resultsList = document.querySelector('resultsList');
resultsList.innerHTML ='';
}

// För varje varje film skapas ett kort med data

movies.forEach(movies => {
    const card = document.createElement('div');
    card.classList.add('results-card')

    const infocard = document.createElement('div')
    card.appendChild(infocard);

    card.addEventListener('click',async () =>{
        if (infocard.classList.contains('info-card')){
            infocard.classList.remove('info-card');
            infocard.innerHTML = '';

        
         } else {
            infocard.classList.add('info-card');
            const infocardTitle = document.createElement('h2');
            infocardTitle.classList.add('info-card__title');

            const infocardactortile = document.createElement('h3');
            infocardactortile.classList.add('info-card__title');

            const infocardactorResult = document.createElement('p');
            infocardactorResult.classList.add ('info-card__result');

            const infocardDirectorResult = document.createElement('p');
            



         }
    
