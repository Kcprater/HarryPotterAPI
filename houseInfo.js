const urlHouses = new URL('https://www.potterapi.com/v1/houses/');
  // params = {
  //   key: key,
  // }

Object.keys(params).forEach(key => urlHouses.searchParams.append(key, params[key]))

let houseDetails = [];

fetch(urlHouses, {
  key: key
})
.then((response) => response.json())
.then(function (data) {

  houseDetails = data;
});

function getHouseDetails(houseName){

  setCrestImage(houseName);

  let houseDetailsFound = houseDetails.filter(function(houseDetail)
  {
    return (houseDetail.name.indexOf(houseName) !== -1 );
  });

  if(houseDetailsFound.length > 0){
    let ourHouse = houseDetailsFound[0];

    document.getElementById('mascotElement').innerHTML = ourHouse.mascot;
    document.getElementById('headOfHouseElement').innerHTML = ourHouse.headOfHouse;
    document.getElementById('houseGhostElement').innerHTML = ourHouse.houseGhost;
    document.getElementById('founderElement').innerHTML = ourHouse.founder;
    document.getElementById('houseCardTitle').innerHTML = ourHouse.name;
  }
}


function setCrestImage(houseName){
  
  switch(houseName) {
    case 'Slytherin':
      document.getElementById('houseCrest').setAttribute('src', './assets/slytherin.jpg');
      break;
    case 'Gryffindor':
      document.getElementById('houseCrest').setAttribute('src', './assets/gryffindor.jpg');
      break;
    case 'Ravenclaw':
      document.getElementById('houseCrest').setAttribute('src', './assets/ravenclaw.jpg');
      break;
    case 'Hufflepuff':
      document.getElementById('houseCrest').setAttribute('src', './assets/hufflepuff.jpg');
      break;
    default: 
  }
}