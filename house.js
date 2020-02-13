const houseUrl = new URL('https://www.potterapi.com/v1/sortingHat');
  // params = {
  //   key: key,
  // }

  // Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
  
  function findUserHouse() {
  fetch(houseUrl, {
    key: key
  })
  .then((response) => response.json())
  .then(function (data) {
  
    let house = data;
    document.getElementById('search').value = house;
    filterCharacters();

    getHouseDetails(house);
    document.getElementById('divHouseInfo').classList.remove("d-none");
  });
}