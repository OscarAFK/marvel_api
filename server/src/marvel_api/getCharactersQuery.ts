import { IncomingMessage } from "http";
import { Character } from "../types/Character";
const { getURLParameters } = require("./authentificationFlow");
const https = require("https");

const CHARACTER_PER_PAGE = 20;

/**
 * Request all the characters from the Marvel api 
 * @param page - The page where the heroes is
 * @returns A promise for the https request
 */
export function requestCharacters(page: number) {
    const url = "https://gateway.marvel.com:443/v1/public/characters?orderBy=-modified&limit=20&offset=" + encodeURI((page * CHARACTER_PER_PAGE).toString()) + "&" + encodeURI(getURLParameters());
    return new Promise<{ code: number, data?: { results: any[] } }>((resolve, reject) => {
        const req = https.get(url, function (response: IncomingMessage) {
            let body = "";
            response.on('data', (d) => body += d);
            response.on('end', () => {
                let bodyJSON: { code: number, data?: { results: any[] } } = JSON.parse(body);
                if (bodyJSON.code >= 400) {
                    return reject(bodyJSON);
                }
                return resolve(bodyJSON);
            });
        });
        req.on('error', (e: Error) => reject(e));
        req.end();
    });
};

/**
 * Parse the result to keep only a list of heroes with relevent infos
 * @param rawSearchResult - The raw result returned by the {@link requestCharacters} function 
 * @returns The list of characters
 */
export function parseSearchResult(rawSearchResult: { code: number, data?: { results: any[] } }) {
    let characters: Character[] = [];
    const charactersList = rawSearchResult?.data?.results || [];
    charactersList.forEach((character: any) => {
        characters.push({
            id: character.id,
            name: character.name,
            description: character.description,
            thumbnail: character.thumbnail.path + "." + character.thumbnail.extension,
            inSuperteam: false
        })
    });
    return characters;
}

module.exports = {
    requestCharacters,
    parseSearchResult
}