"use strict";
const { writeFileSync, readFileSync } = require('fs');
const JSON_SUPERTEAM_LOCATION = "./data/superteam.json";
/**
 * Get the characters from the {@link JSON_SUPERTEAM_LOCATION} file.
 * @returns {Array.<object>} The list of characters saved in the superteam
 */
function getSuperteam() {
    try {
        let superteam = JSON.parse(readFileSync(JSON_SUPERTEAM_LOCATION));
        superteam.forEach(character => {
            character.inSuperteam = true;
        });
        return superteam;
    }
    catch (error) {
        return [];
    }
}
/**
 * Add or remove a character from the superteam
 * @param {object} character - The charater to add or remove
 */
function addOrRemoveCharacter(character) {
    let superteam = getSuperteam();
    const indexCharacter = superteam.findIndex((a) => { return a.id === character.id; });
    if (indexCharacter === -1) {
        superteam.push(character);
    }
    else {
        superteam.splice(indexCharacter, 1);
    }
    writeFileSync(JSON_SUPERTEAM_LOCATION, JSON.stringify(superteam), { flag: 'w' });
}
/**
 * Update a character list with the data from the superteam (if they are in it)
 * @param {Array.<object>} characters - The list of characters to update
 * @returns {Array.<object>} The updated list of characters
 */
function updateCharactersWithSuperteamData(characters) {
    const superteam = getSuperteam();
    for (let index = 0; index < characters.length; index++) {
        const character = characters[index];
        const indexCharacterId = superteam.findIndex((a) => {
            return a.id === character.id;
        });
        if (indexCharacterId === -1) {
            continue;
        }
        character.inSuperteam = true;
    }
    ;
    return characters;
}
module.exports = {
    getSuperteam,
    addOrRemoveCharacter,
    updateCharactersWithSuperteamData
};
