const { getURLParameters } = require("./authentificationFlow");
const https = require("https");

const CHARACTER_PER_PAGE = 20;

/**
 * Request all the characters from the Marvel api 
 * @param {number} page - The page where the heroes is
 * @returns {Promise<object>} A promise for the https request
 */
function requestCharacters(page) {
    const url = "https://gateway.marvel.com:443/v1/public/characters?orderBy=-modified&limit=20&offset=" + encodeURI(page * CHARACTER_PER_PAGE) + "&" + encodeURI(getURLParameters());
    return new Promise((resolve, reject) => {
        const req = https.get(url, function (response) {
            let body = "";
            response.on('data', (d) => body += d);
            response.on('end', () => {
                let bodyJSON = JSON.parse(body);
                if (bodyJSON.code >= 400) {
                    return reject(bodyJSON);
                }
                return resolve(bodyJSON);
            });
        });
        req.on('error', (e) => reject(e));
        req.end();
    });
};

/**
 * Parse the result to keep only a list of heroes with relevent infos
 * @param {object} rawSearchResult - The raw result returned by the {@link requestCharacters} function 
 * @returns {Array.<string>} The list of characters
 */
function parseSearchResult(rawSearchResult) {
    let characters = [];
    const charactersList = rawSearchResult?.data?.results || [];
    charactersList.forEach(character => {
        characters.push({
            id: character.id,
            name: character.name,
            description: character.description,
            thumbnail: character.thumbnail.path + "." + character.thumbnail.extension
        })
    });
    return characters;
}

module.exports = {
    requestCharacters,
    parseSearchResult
}