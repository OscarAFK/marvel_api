import { Character } from "../types/Character";

async function checkAndReturnError(res: Response) {
    if (res.status >= 400) {
        const decodedError = await res.json() || res.status;
        return decodedError;
    }
    return res.json();
}

/**
 * Fetch characters on the Marvel API from the backend api
 * @param page The page of characters to fetch
 * @param abortController
 * @returns The promise of an object containing the relevent informations concerning the fetch or an error message. 
 */
export function fetchCharacters(page: number, abortController: AbortController) {
    return fetch("http://localhost:8000/characters?page=" + encodeURIComponent(page), { signal: abortController.signal })
        .then((res) => checkAndReturnError(res))
        .then((data) => {
            if (data.error) {
                return data;
            }
            return { characters: data, fetchStarted: false };
        }).catch((error) => {
            return { error: error.toString() };
        });
}

/**
 * Fetch the characters of the superteam
 * @returns The promise of an object containing the characters or an error message.
 */
export function fetchSuperteamCharacters() {
    return fetch("http://localhost:8000/superteam")
        .then((res) => checkAndReturnError(res))
        .then((data) => {
            return data;
        }).catch((error) => {
            return { error: error };
        });
}

/**
 * A request to add or remove a character to the superteam from the backend api
 * @param character The character to add
 * @returns The promise of an object containing the updated characters list in the superteam or an error message. 
 */
export function addRemoveCharacterFromSuperteam(character: Character) {
    return fetch("http://localhost:8000/superteam/addOrRemoveCharacter", { method: 'POST', headers: { "Content-type": "application/json" }, body: JSON.stringify(character) })
        .then((res) => checkAndReturnError(res))
        .then((data) => {
            return data;
        }).catch((error) => {
            return { error: error };
        });
}