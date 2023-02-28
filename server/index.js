const express = require("express");
const cors = require("cors");
const app = express();
const { requestCharacters, parseSearchResult } = require("./src/marvel_api/getCharactersQuery");
const { resetCredentials, trySetupCredentials, getCredentials, areCredentialsValid } = require("./src/marvel_api/authentificationFlow");
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
        if (characters.message) {
            res.json({ error: characters.code + ": " + characters.message });
            return;
        }
        const formattedCharacters = updateCharactersWithSuperteamData(parseSearchResult(characters));
        res.json(formattedCharacters);
    }).catch((error) => {
        console.log(error);
        console.error("An error occured during the process of getting the characters");
        res.json(error);
    });
});

app.get("/superteam", (req, res) => {
    res.json(getSuperteam());
});

app.get("/login", (req, res) => {
    const credentials = getCredentials();
    if (!areCredentialsValid(credentials)) {
        res.json({ todo: "askCredentials" });
        return;
    }
    res.json({ todo: "nothing" });
});

app.post("/login", (req, res) => {
    if (!trySetupCredentials(req)) {
        res.status(400).json({});
        return;
    }
    res.status(200).json({});
});

app.delete("/login", (req, res) => {
    resetCredentials();
    res.status(200).json({});
});

app.post("/superteam/addOrRemoveCharacter", (req, res) => {
    const character = req.body;
    addOrRemoveCharacter(character);
    res.status(200).json({ status: 200, characters: getSuperteam() });
});

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});