
const searchButton = document.getElementById('button-search');
let list = document.getElementById('my-list-cards');

searchButton.addEventListener( 'click', async (e)=>{

    e.preventDefault();
    const atk = document.getElementById('minimum-atk').value;
    console.log(atk);
    const archetype = document.getElementById('archetype-name').value;
    console.log(archetype);

                                        /*http://localhost:6800/search-archetype?archetype=Alien&atk=500*/
    const response = await fetch(`http://localhost:6800/search-archetype?archetype=${archetype}&atk=${atk}`);
    const json = await response.json();

    //document.getElementById('search-result').innerHTML = JSON.stringify(json);
    //const jsonFiltered = json.data.filter(e => e.type.includes('Monster'));
    //document.getElementById('card-image').src =  json.map( e=>e.card_image );
    //document.getElementById('card-image').src =  json[0].card_image;

    document.getElementById('card-details').innerText = json.map( e=>  {
        let li = document.createElement('li');
        li.innerText=e.name + ' \n ' + 'atk: ' + e.atk;
        list.append(li);
    } );

} );

function clearList(){
    list.innerText = '';
}
