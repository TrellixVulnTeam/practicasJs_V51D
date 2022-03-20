import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());

try {
    app.listen(6800, () => {
        console.log('server on');
    })
} catch (err) {
    console.error('error starting the server' + err);
}

/*home*/
app.get('/', async (req, res) => {
    const response = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php');
    const json = await response.json();

    console.log(json);
    res.json(json);

});

/*return spell cards*/
app.get('/spell-cards', async (req, res) => {
    const response = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php');
    const json = await response.json();

    /*filter only works for arrays*/
    const jsonFiltered = json.data.filter(e => e.type === 'Spell Card');
    console.log(jsonFiltered);
    res.json(jsonFiltered)

});

/*return trap cards*/
app.get('/trap-cards', async (req, res) => {
    const response = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php');
    const json = await response.json();

    /*filter only works for arrays*/
    const jsonFiltered = json.data.filter(e => e.type === 'Trap Card');
    console.log(jsonFiltered);
    res.json(jsonFiltered);

});

/*return monster cards*/
app.get('/monster-cards', async (req, res) => {
    const response = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php');
    const json = await response.json();

    /*filter only works for arrays*/
    const jsonFiltered = json.data.filter(e => e.type.includes('Monster'));
    console.log(jsonFiltered);
    res.json(jsonFiltered);

});

/*return monster by archetype cards*/
/*http://localhost:6800/search-archetype?archetype=Alien&atk=500*/
app.get('/search-archetype', async (req, res) => {

    const response = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php');
    const json = await response.json();

    const archetype = req.query.archetype;
    const atk = req.query.atk;

    /*filter only works for arrays*/

    const jsonFiltered = json.data.filter(e => e.archetype === archetype && e.atk > atk);
    console.log(jsonFiltered);

    const cardsFiltered = jsonFiltered.map(e => {
        return {
            name: e.name,
            type: e.type,
            description: e.desc,
            card_image: e.card_images[0].image_url,
            card_image_02: e.card_images[0].image_url_small,
            card_image_id: e.card_images[0].id,
            atk: e.atk,
            def: e.def,
            archetype:e.archetype
        };
    });

    console.log(cardsFiltered);
    res.json(cardsFiltered);

});

/*check if card exists by name*/
/*http://localhost:6800/check-by-name?cardName=Alien*/
app.get('/check-by-name', async (req, res) => {

    const cardName = req.query.cardName;
    const response = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php?name=' + cardName);
    const json = await response.json();
    json["error"] ? res.json(false) : res.json(true);

});

/* Recibe por body dos parametros. Si son iguales a Java y Swing, responde con la dura verdad */
/* curl -X POST -d 'language=java' -d 'tech=swing' http://localhost:6500/molaono */
app.post("/molaono", (req, res) => {
    const { language, tech } = req.body;
    let response;

    if (language.toLowerCase() !== "java" && tech.toLowerCase() !== "swing") {
        response = { mola: "Si que mola" };
    } else {
        response = { mola: "No mola" };
    }
    res.json(response);
});

app.listen(6500, () => {
    console.log("Servidor iniciado");
});

