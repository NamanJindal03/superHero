(function a(){
    const accessTokenApi = 3203763853000598;

    //Calling the api for names
    async function heroResultsApi(superHeroName){
        var result = await fetch(`https://superheroapi.com/api/${accessTokenApi}/search/${superHeroName}`);
        let superhero = await result.json();
        return superhero.results;
    }

    //Remove Previous Results from the page
    function clearExistingResults(listGroup){
        listGroup.innerHTML = ``;
    }

    //Showing Results in List when entered or search is clicked
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

    /* Giving Suggestions on typing in search */
    function showSuperHeroSuggestions(){
        var superHeroName = document.getElementById("get-superhero").value;
        heroResultsApi(superHeroName)
            .then(data => {
                clearExistingResults(document.querySelector('.list-group-b'));
                for(value in data){
                    appendOnSuggestionBox(data[value].name, data[value].id);
                }
            })
            
    }

    

    //Appending the hero data on the page
    function appendOnPage(name, id){
        var listGroup = document.querySelector('.list-group-a');
        listGroup.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center"   >
                            <span onclick=relocate(${id})>${name}</span>
                            <button onclick=addToFav(this) data-name='${name}' data-id='${id}' >+</button>
                            </li>`;
    }

    /* Appening in search box */
    function appendOnSuggestionBox(name, id){
        var listGroup = document.querySelector('.list-group-b');
        listGroup.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center" data-id='${id}'>
                            ${name}
                            </li>`;
    }


    /* Implemented debounce so as to prevent excessive API calls */
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

    /* Attaching enter button to display in list */
    superHeroInputBox.addEventListener("keypress", ()=>{

        if (event.keyCode === 13) {
            showSuperHeroResults();
        }
    });

    //implementing debouncing to restrict number of api calls
    superHeroInputBox.addEventListener('keyup',debounce(showSuperHeroSuggestions, 400))
})();

//Display Suggestion box upon focus
function activateSuggestionBox(){
    document.querySelector('.suggestion-box').style.display = 'inline';
}

/* Add hereoes to fav list using local storage */
function addToFav(element){
    var newFavHero = element.dataset.name;
    var heroId = element.dataset.id;
    localStorage.setItem(heroId, newFavHero);
}
/* Opening individual hero page */
function relocate(id){
    location.href=`individual-hero.html?${id}`;
}

/* WHen focus removed remove suggestion box */
var superHeroInputBox = document.getElementById("get-superhero");
superHeroInputBox.addEventListener("blur", ()=>document.querySelector('.suggestion-box').style.display = 'none');