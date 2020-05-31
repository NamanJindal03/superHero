const accessTokenApi = 3203763853000598;
//Calling the api for names
async function heroResultsApi(superHeroName){
    var result = await fetch(`https://superheroapi.com/api/${accessTokenApi}/search/${superHeroName}`);
    let superhero = await result.json();
    return superhero.results;
}

//Remove Previous Results from the page
function clearExistingResults(listGroup){
    //var listGroup = document.querySelector('.list-group-a');
    listGroup.innerHTML = ``;
}

//Showing Results as entered
function showSuperHeroResults(){
    var superHeroName = document.getElementById("get-superhero").value;
    heroResultsApi(superHeroName)
        .then(data => {
            clearExistingResults(document.querySelector('.list-group-a'));
            for(value in data){
                appendOnPage(data[value].name, data[value].id);
            }
        })
        
}
function showSuperHeroSuggestions(){
    var superHeroName = document.getElementById("get-superhero").value;
    console.log(superHeroName);
    heroResultsApi(superHeroName)
        .then(data => {
            clearExistingResults(document.querySelector('.list-group-b'));
            for(value in data){
                appendOnSuggestionBox(data[value].name, data[value].id);
            }
        })
        
}
function relocate(id){
    location.href=`individual-hero.html?${id}`;
}
//Appending the hero data on the page
function appendOnPage(name, id){
    var listGroup = document.querySelector('.list-group-a');
    listGroup.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center" data-id='${id}' onclick=relocate(${id}) >
                        ${name}
                        <button onclick=naman()>+</button>
                        </li>`;
}

function appendOnSuggestionBox(name, id){
    var listGroup = document.querySelector('.list-group-b');
    listGroup.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center" data-id='${id}'>
                        ${name}
                        </li>`;
}
function debounce(func, delay){
    let timer;
    return function(){
        const context = this
        const args = arguments 
        clearTimeout(timer);
        timer= setTimeout(() => {
            func.apply(context, args);
        }, delay);
    }
}
var searchButton = document.querySelector('.input-group-text');
searchButton.addEventListener("click",showSuperHeroResults)
var superHeroInputBox = document.getElementById("get-superhero");
superHeroInputBox.addEventListener("keypress", ()=>{

    if (event.keyCode === 13) {
        showSuperHeroResults();
    }
});

//implementing debouncing to restrict number of api calls
superHeroInputBox.addEventListener('keyup',debounce(showSuperHeroSuggestions, 400))

//Display Suggestion box upon focus
function activateSuggestionBox(){
    document.querySelector('.suggestion-box').style.display = 'inline';
}
superHeroInputBox.addEventListener("blur", ()=>document.querySelector('.suggestion-box').style.display = 'none');



function naman(){
    console.log("button clicked");
}

