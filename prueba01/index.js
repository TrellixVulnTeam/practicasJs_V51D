import express from "express";
import cors from "cors";
import fetch from "node-fetch";
const app = express();
app.use( cors() );

try{
    app.listen(4000, () => {
        console.log('server on');
    })
}catch (err){
    console.error('error starting the server' + err);
}

app.get( '/', async (req, res) => {
    const response = await fetch('https://api.scryfall.com/cards/random');
    const json = await response.json();
    res.json(json);
} );