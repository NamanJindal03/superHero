function appendOnPage(name, id){
    console.log(name + ":" + id);
    var listGroup = document.querySelector('.list-group-a');
    listGroup.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center"   >
                        <span onclick=relocate(${id})>${name}</span>
                        <button onclick=removeFromFav(this) data-name='${name}' data-id='${id}' >X</button>
                        </li>`;
}

function removeFromFav(element){
    localStorage.removeItem(element.dataset.id);
    loadHeroes();
}

function clearExistingResults(){
    var listGroup = document.querySelector('.list-group-a');
    listGroup.innerHTML = ``;
}

function loadHeroes(){
    clearExistingResults();
    for ( var i = 0; i < localStorage.length; ++i ) {
        appendOnPage( localStorage.getItem( localStorage.key( i ) ), localStorage.key(i) );
      }
}