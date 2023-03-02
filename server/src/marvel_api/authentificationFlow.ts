const { createHash } = require('crypto');
import { writeFileSync, readFileSync } from 'fs';
import { Credentials } from '../types/Credentials';
import { Request } from 'express';

const JSON_CREDENTIALS_LOCATION = "./data/credentials.json";
/**
 * Read the "./data/credentials.json" file to get the user specified credential. If it does not found the file, create it. 
 * @returns The credentials in an object.
 */
export function getCredentials() {
    try {
        let credentials = JSON.parse(readFileSync(JSON_CREDENTIALS_LOCATION, 'utf-8'));
        if (!areCredentialsValid(credentials)) {
            throw Error();
        }
        return credentials;
    } catch (error) {
        return resetCredentials();
    }
}

export function getURLParameters() {
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
 * @param credentials The credentials to test
 * @returns if the credentials are valid
 */
export function areCredentialsValid(credentials: Credentials) {
    if (credentials.publicKey === "" || credentials.privateKey === "") {
        return false;
    }
    return true;
}

/**
 * Reset the credentials
 * @returns the new empty credentials
 */
export function resetCredentials() {
    const credentials: Credentials = {
        publicKey: "",
        privateKey: ""
    }
    writeFileSync(JSON_CREDENTIALS_LOCATION, JSON.stringify(credentials), { flag: 'w' });
    return credentials;
}

/**
 * Try to setup credentials from a POST request
 * @param req - The request of a POST operation
 * @returns if the credentials have been successfully set
 */
export function trySetupCredentials(req: Request) {
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