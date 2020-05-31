const accessTokenApi = 3203763853000598;
async function getDetails(id){
    var result = await fetch(`https://superheroapi.com/api/${accessTokenApi}/${id}`);
    let superhero = await result.json();
    return superhero;
}
function loadHeroDetails(){
    let id = window.location.href.split('?')[1];
    console.log(id);
    getDetails(id)
        .then(data => {
            addName(data.name);
            addPowerStats(data.powerstats);
            addBio(data.biography);
            addImage(data.image.url);
            console.log(data.image.url);
        })
    
}

function addName(name){
    var heading = document.querySelector('.container > h1');
    heading.innerText += ` ${name}`;
}

function addPowerStats(powers){
    let powerDisplay = document.querySelectorAll('main p')[0];
    for(key in powers){
        powerDisplay.innerHTML += `${key} : ${powers[key]} <br>`;
    }
}

function addBio(biography){
    let biographyDisplay = document.querySelectorAll('main p')[1];
    for(key in biography){
        biographyDisplay.innerHTML += `${key} : ${biography[key]} <br>`;
    }
}
function addImage(url){
    let image = document.querySelector(".image-box img");
    image.src = `${url}`;
}