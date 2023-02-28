/**
 * Fetch characters on the Marvel API from the backend api
 * @param {number} page - The page of characters to fetch
 * @returns {Promise.<object>} The promise of an object containing the relevent informations concerning the fetch or an error message. 
 */
export function fetchCharacters(page, abortController) {
    return fetch("http://localhost:8000/characters?page=" + encodeURIComponent(page), { signal: abortController.signal })
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
                console.error(data);
                return { error: data.error, characters: [], fetchStarted: false };
            }
            return { characters: data, fetchStarted: false };
        }).catch((error) => {
            return { error: error.toString() };
        });
}

/**
 * Fetch the characters of the superteam
 * @returns {Promise.<object>} The promise of an object containing the characters or an error message.
 */
export function fetchSuperteamCharacters() {
    return fetch("http://localhost:8000/superteam")
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
                return { error: data.error };
            }
            return data;
        }).catch((error) => {
            return { error: error };
        });
}

/**
 * A request to add or remove a character to the superteam from the backend api
 * @param {object} character 
 * @returns {Promise.<object>} The promise of an object containing the updated characters list in the superteam or an error message. 
 */
export function addRemoveCharacterFromSuperteam(character) {
    return fetch("http://localhost:8000/superteam/addOrRemoveCharacter", { method: 'POST', headers: { "Content-type": "application/json" }, body: JSON.stringify(character) })
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
                return { error: data.error };
            }
            return data;
        }).catch((error) => {
            return { error: error };
        });
}