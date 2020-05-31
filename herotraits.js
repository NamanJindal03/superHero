const accessTokenApi = 3203763853000598;

/* Fetching all the details of hero using its id */
async function getDetails(id){
    var result = await fetch(`https://superheroapi.com/api/${accessTokenApi}/${id}`);
    let superhero = await result.json();
    return superhero;
}
function loadHeroDetails(){

    /* Fetching id from th url */
    let id = window.location.href.split('?')[1];
    getDetails(id)
        .then(data => {
            addName(data.name);
            addPowerStats(data.powerstats);
            addBio(data.biography);
            addImage(data.image.url);
        })
    
}
/* Add name of hero to page */
function addName(name){
    var heading = document.querySelector('.container > h1');
    heading.innerText += ` ${name}`;
}

/* Add power stats of hero to page */
function addPowerStats(powers){
    let powerDisplay = document.querySelectorAll('main p')[0];
    for(key in powers){
        powerDisplay.innerHTML += `${key} : ${powers[key]} <br>`;
    }
}
/* Add bio of hero to page */
function addBio(biography){
    let biographyDisplay = document.querySelectorAll('main p')[1];
    for(key in biography){
        biographyDisplay.innerHTML += `${key} : ${biography[key]} <br>`;
    }
}

/* Add hero image */
function addImage(url){
    let image = document.querySelector(".image-box img");
    image.src = `${url}`;
}