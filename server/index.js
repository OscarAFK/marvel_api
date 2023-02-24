const express = require("express");
const cors = require("cors");
const app = express();
const { requestCharacters, parseSearchResult } = require("./src/marvel_api/getCharactersQuery");
const { addOrRemoveCharacter, updateCharactersWithSuperteamData, getSuperteam } = require("./src/superteamManager");

app.use(cors());
app.use(express.json());

app.get("/characters", (req, res) => {
    const page = req?.query?.page;
    if (!page) {
        console.error("No page given");
        res.json({ error: "no_page" });
        return;
    }
    requestCharacters(page).then((characters) => {
        res.json(updateCharactersWithSuperteamData(parseSearchResult(characters)));
    }).catch((error) => {
        console.error("An error occured during the process of getting albums");
        res.json(error);
    });
});

app.get("/superteam", (req, res) => {
    res.json(getSuperteam());
});

app.post("/superteam/addOrRemoveCharacter", (req, res) => {
    const character = req.body;
    addOrRemoveCharacter(character);
    res.status(200).json({ status: 200, characters: getSuperteam() });
});

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});