async function getCard(){
    const response = await fetch('http://localhost:4000/');
    const json = await response.json();
    await fill(json);
}

function fill(json){
    document.getElementById('foto').src = json.image_uris.art_crop;
    document.getElementById('name').innerHTML = json.name;
    document.getElementById('type').innerHTML = json.type_line;
    document.getElementById('mana').innerHTML = json.mana_cost;
    document.getElementById('stats').innerHTML =   'Power ' +  json.power + '/' + 'Toughness ' + json.toughness
    document.getElementById('text').innerHTML = json.oracle_text;
}