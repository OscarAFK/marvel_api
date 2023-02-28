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
        if (!areCredentialsValid(credentials)) {
            throw error();
        }
        return credentials;
    } catch (error) {
        return resetCredentials();
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

/**
 * A function checking if the credentials given has parameters are valid
 * @param {object} credentials The credentials to test
 * @returns {boolean} if the credentials are valid
 */
function areCredentialsValid(credentials) {
    if (credentials.publicKey === "" || credentials.privateKey === "") {
        return false;
    }
    return true;
}

/**
 * Reset the credentials
 * @returns {object} the new empty credentials
 */
function resetCredentials() {
    const credentials = {
        publicKey: "",
        privateKey: ""
    }
    writeFileSync(JSON_CREDENTIALS_LOCATION, JSON.stringify(credentials), { flag: 'w' });
    return credentials;
}

/**
 * Try to setup credentials from a POST request
 * @param {object} req - The request of a POST operation
 * @returns {boolean} if the credentials have been successfully set
 */
function trySetupCredentials(req) {
    let credentials = getCredentials();
    if (areCredentialsValid(credentials)) {
        return true;
    }
    credentials.publicKey = req.body.publicKey;
    credentials.privateKey = req.body.privateKey;
    if (areCredentialsValid(credentials)) {
        writeFileSync(JSON_CREDENTIALS_LOCATION, JSON.stringify(credentials), { flag: 'w' });
        return true;
    }
    return false;
}

module.exports = {
    getCredentials,
    getURLParameters,
    areCredentialsValid,
    resetCredentials,
    trySetupCredentials,
}