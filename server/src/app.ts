import express, { Request, Response } from "express";
const cors = require("cors");
const app = express();
import { requestCharacters, parseSearchResult } from "./marvel_api/getCharactersQuery";
import { resetCredentials, trySetupCredentials, getCredentials, areCredentialsValid } from "./marvel_api/authentificationFlow";
import { addOrRemoveCharacter, updateCharactersWithSuperteamData, getSuperteam } from "./superteamManager";
import { RequestCharactersQuery } from "./types/RequestCharactersQuery";

app.use(cors());
app.use(express.json());

app.get("/characters", (req: Request<any, any, any, RequestCharactersQuery>, res: Response) => {
    const page = req?.query?.page;
    if (!page) {
        console.error("No page given");
        res.status(400).json({ error: "no_page" });
        return;
    }
    requestCharacters(page).then((characters) => {
        const formattedCharacters = updateCharactersWithSuperteamData(parseSearchResult(characters));
        res.status(200).json(formattedCharacters);
    }).catch((error) => {
        console.log(error);
        console.error("An error occured during the process of getting the characters");
        res.status(500).json(error);
    });
});

app.get("/superteam", (req: Request, res: Response) => {
    res.status(200).json(getSuperteam());
});

app.get("/login", (req: Request, res: Response) => {
    const credentials = getCredentials();
    if (!areCredentialsValid(credentials)) {
        res.status(200).json({ todo: "askCredentials" });
        return;
    }
    res.status(200).json({ todo: "nothing" });
});

app.post("/login", (req: Request, res: Response) => {
    if (!trySetupCredentials(req)) {
        res.status(400).json({});
        return;
    }
    res.status(200).json({});
});

app.delete("/login", (req: Request, res: Response) => {
    resetCredentials();
    res.status(200).json({});
});

app.post("/superteam/addOrRemoveCharacter", (req: Request, res: Response) => {
    const character = req.body;
    addOrRemoveCharacter(character);
    res.status(200).json({ status: 200, characters: getSuperteam() });
});

export default app;