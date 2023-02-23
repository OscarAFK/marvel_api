const express = require("express");
const cors = require("cors");
const app = express();
const { requestCharacters, parseSearchResult } = require("./src/marvel_api/getCharactersQuery");

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
        res.json(parseSearchResult(characters));
    }).catch((error) => {
        console.error("An error occured during the process of getting albums");
        res.json(error);
    });
});

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});