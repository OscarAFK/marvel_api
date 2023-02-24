/**
 * Fetch characters on the Marvel API from the backend api
 * @param {number} page - The page of characters to fetch
 * @returns {Promise.<object>} The promise of an object containing the relevent informations concerning the fetch or an error message. 
 */
export function fetchCharacters(page, abortController) {
    return fetch("http://localhost:8000/characters?page=" + encodeURIComponent(page), {signal: abortController.signal})
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
                console.error(data);
                return { characters: [], fetchStarted: false };
            }
            return { characters: data, fetchStarted: false };
        }).catch((error) => {
            return { error: error };
        });
}