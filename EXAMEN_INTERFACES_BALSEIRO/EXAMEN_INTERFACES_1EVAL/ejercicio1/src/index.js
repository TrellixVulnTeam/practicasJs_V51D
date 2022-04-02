import express from "express"
import fetch from "node-fetch"
import cors from "cors"

const app = express();
app.use(cors());
app.use(express.urlencoded({
  extended: true
}));

const civilizationExists = async (civ) => {
  const rawData = await fetch("https://age-of-empires-2-api.herokuapp.com/api/v1/civilization/" + civ)
  const data = await rawData.json();
  return data["message"] ? false : true;
};

const getCivilizations = async () => {
  const rawData = await fetch("http://age-of-empires-2-api.herokuapp.com/api/v1/civilizations");
  const data = await rawData.json()

  /* Only Age of Kings expansion */
  const filteredData = filterOnlyAgeOfKings(data["civilizations"]);

  /* Only id, name and army type */
  const mappedData = filteredData.map((item) => {
    return { id: item.id, name: item.name, army_type: item.army_type };
  });

  return mappedData;
};

const getUnits = async () => {
  const rawData = await fetch("http://age-of-empires-2-api.herokuapp.com/api/v1/units")
  const data = await rawData.json()

  /* Only Age of Kings expansion */
  const filteredData = filterOnlyAgeOfKings(data["units"]);

  return filteredData;
}

const filterOnlyAgeOfKings = (data) => {
  return data.filter((item) => {
    return item["expansion"].toLowerCase() === "age of kings";
  });
}

const mapUnits = (data) => {
  return data.map((item) => {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      expansion: item.expansion,
      cost: item.const,
      build_time: item.build_time,
      attack: item.attack,
      armor: item.armor
    }
  });
}

app.get("/existe/:civ", async (req, res) => {
  const data = await civilizationExists(req.params.civ);
  res.json(data);
});

app.get("/civilizaciones", async (req, res) => {
  const data = await getCivilizations();
  res.json(data)
});

app.get("/unidades", async (req, res) => {
  const data = await getUnits();
  const { nombre, ataque } = req.query;
  let filteredData;
  if (!nombre && !ataque) {
    res.json({ error: "Wrong parameters" });
    return;
  }

  if (nombre && ataque) filteredData = data.filter((item) => Number(item["attack"]) <= Number(ataque) && item["name"] === nombre);
  else if (nombre && !ataque) filteredData = data.filter((item) => item["name"] === nombre);
  else if (ataque && !nombre) filteredData = data.filter((item) => Number(item["attack"]) >= Number(ataque));
  else filteredData = {};

  res.json(mapUnits(filteredData));
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
