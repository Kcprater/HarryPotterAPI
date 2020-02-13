const key = '$2a$10$tE9Q/PpSuP7rQLFkrB2IOOcl.0ptM34qLwotYCBjL/p9DIL.o4pMK';

const url = new URL('https://www.potterapi.com/v1/characters/'),
  params = {
    key: key,
  }

Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

let characters = [];

fetch(url, {
  key: key
})
.then((response) => response.json())
.then(function (data) {

  characters = data;
  let tbdy = document.getElementById('info');
  let tbl = document.getElementById('mainTable');

   return characters.map(function (character) {
     let tr = createRowFromCharacter(character);
    
    tbdy.appendChild(tr);
  })
});

document.getElementById("search")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        filterCharacters();
    }
});

function filterCharacters() {
  let searchInput=document.getElementById('search').value.toLowerCase();
  let charactersFound = characters.filter(function(character){

    let characterNameLower = character.name.toLowerCase();
    
    let characterHouse = character.house;
    if(typeof characterHouse !== 'undefined')
    {
      characterHouse = character.house.toLowerCase();    
    }
    
    return (characterNameLower.indexOf(searchInput) !== -1 || 
      typeof characterHouse !== 'undefined' && characterHouse.indexOf(searchInput) !== -1);
  });

  if(charactersFound.length === 0) {
  document.getElementById('divNoResults').classList.remove("d-none");  
  document.getElementById('divResults').classList.add("d-none");
} else {
  let newTbdy = document.createElement('tbody');
  newTbdy.setAttribute('id' , 'info');

  for (let i = 0; i < charactersFound.length; i++) {
    let newRow = createRowFromCharacter(charactersFound[i]);
    newTbdy.appendChild(newRow);
  }
  
  let oldTbdy = document.getElementById('info');

  oldTbdy.parentNode.replaceChild(newTbdy, oldTbdy);
  
  // show table
  document.getElementById('divNoResults').classList.add("d-none");
  document.getElementById('divResults').classList.remove("d-none");
}
}

function createRowFromCharacter(character){
  let tr = document.createElement('tr')
  let td = document.createElement('td');
  td.appendChild(document.createTextNode(character.name));
  tr.appendChild(td);

  td = document.createElement('td');
  td.appendChild(document.createTextNode(character.house));
  tr.appendChild(td)

  td = document.createElement('td');
  td.appendChild(document.createTextNode(character.bloodStatus));
  tr.appendChild(td)

  td = document.createElement('td');
  if(typeof character.wand !== 'undefined')
  {
   td.appendChild(document.createTextNode(character.wand));
  }
  else{
    td.appendChild(document.createTextNode(''));
  }
  tr.appendChild(td)

  return tr;
}

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

