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
    const response = await fetch('https://swapi.dev/api/');
    const json = await response.json();

    console.log(json);
    res.json(json);

});


const getCharacters = async (counter) => {
    const response = await fetch("https://swapi.dev/api/people?page=" + counter);
    const json = await response.json()

    return json.results.map((e) => {
        return {id: e.url.substring(29, (e.url.length) - 1), name: e.name, gender: e.gender };
    });

}


const getAllPages = async() => {
    let allPages=[];
    for (let i = 1; i <= 9; i++) {
        const data = await getCharacters(i);
        allPages.push(...data);
    }
    return allPages;

}

/*character names*/
app.get("/characters/", async (req, res) => {
    const data = await getAllPages();
    res.json(data);
});

/*starships*/
app.get("/starships/", async (req, res) => {
    const response = await fetch('https://swapi.dev/api/starships/');
    const json = await response.json();

    const jsonMapped = json.results.map((e) => {
        return {name: e.name , mglt:e.MGLT};
    });
    res.json(jsonMapped)
});
