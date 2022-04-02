const searchButton = document.getElementById('button-choose');
let list = document.getElementById('list-results');

searchButton.addEventListener('click', async (e)=>{

    let starship01 = document.getElementById('first-ship').value;
    let starship02 = document.getElementById('second-ship').value;
    console.log(starship01 + ' ' + starship02);

    const response = await fetch(`http://localhost:6800/starships/`);
    const json = await response.json();
    console.log(json);

    const jsonFiltered01 = json.filter(e => e.name === starship01);
    console.log('starship 01 name: ' + jsonFiltered01[0].name + 'starship 01 mglt: ' + jsonFiltered01[0].mglt);

    const jsonFiltered02 = json.filter(e => e.name === starship02);
    console.log('starship 02 name: ' + jsonFiltered02[0].name + 'starship 02 mglt: ' + jsonFiltered02[0].mglt);


    if (jsonFiltered01[0].mglt>jsonFiltered02[0].mglt){
        list.innerHTML = 'Spaceship  <span style="color: orange;">'+jsonFiltered01[0].name+'</span>  is faster than <span style="color: orange;">'+jsonFiltered02[0].name+'</span>'

    }else if (jsonFiltered01[0].mglt<jsonFiltered02[0].mglt){
        list.innerHTML = 'Spaceship  <span style="color: orange;">'+jsonFiltered02[0].name+'</span>  is faster than <span style="color: orange;">'+jsonFiltered01[0].name+'</span>'
    }else if(jsonFiltered01[0].mglt===jsonFiltered02[0].mglt){
        list.innerHTML = 'Spaceship  <span style="color: orange;">'+jsonFiltered01[0].name+'</span>  has the same speed that <span style="color: orange;">'+jsonFiltered02[0].name+'</span>'
    }

   /* jsonFiltered01[0].mglt>jsonFiltered02[0].mglt? list.innerText=jsonFiltered01[0].name + ' is faster than ' + jsonFiltered02[0].name:jsonFiltered02[0].name + ' is faster than ' + jsonFiltered01[0].name;
    jsonFiltered01[0].mglt===jsonFiltered02[0].mglt? list.innerText = jsonFiltered01[0].name + ' and ' + jsonFiltered02[0].name + ' has the same speed ':console.log('');
*/

   /* jsonFiltered01[0].mglt>jsonFiltered02[0].mglt? console.log(jsonFiltered01[0].name + ' is faster than ' + jsonFiltered02[0].name):console.log(jsonFiltered02[0].name + ' is faster than ' + jsonFiltered01[0].name);
*/

})
