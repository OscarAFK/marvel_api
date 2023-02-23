const { createHash } = require('crypto');
const { writeFileSync, readFileSync } = require('fs');

const JSON_CREDENTIALS_LOCATION = "./data/credentials.json";

/**
 * Read the "./data/credentials.json" file to get the user specified credential. If it does not found the file, create it. 
 * @returns {object} The credentials in an object.
 */
function getCredentials() {
    try {
        let credentials = JSON.parse(readFileSync(JSON_CREDENTIALS_LOCATION));
        if (credentials.privateKey === "" || credentials.publicKey === "") {
            throw error();
        }
        return credentials;
    } catch (error) {
        console.log("Could not retrieve your Spotify credentials from ./data/credentials.json, please fill them in.")
        const credentials = {
            publicKey: "",
            privateKey: ""
        }
        writeFileSync(JSON_CREDENTIALS_LOCATION, JSON.stringify(credentials), { flag: 'w' });
        return credentials;
    }
}

function getURLParameters() {
    const credentials = getCredentials();
    if (credentials.error) {
        return "";
    }
    const timeStamp = Date.now();
    const keyToHash = timeStamp + credentials.privateKey + credentials.publicKey;
    return "ts=" + timeStamp + "&apikey=" + credentials.publicKey + "&hash=" + createHash('md5').update(keyToHash).digest('hex');
}

module.exports = {
    getCredentials,
    getURLParameters
}