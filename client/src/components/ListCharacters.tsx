import CharacterDisplayer from "./CharacterDisplayer";
import { Character } from "../types/Character";
import { OperationOnCharacter } from "./../types/OperationOnCharacter";
import React from "react";

/**
 * A React component used to display a list of characters
 * 
 * @param characters The list of characters to display
 * @param addRemoveCharacterFromSuperteam A callback for when the character should be added/removed to the superteam 
 */
function ListCharacters(props: { characters: Character[], addRemoveCharacterFromSuperteam: OperationOnCharacter }) {

    /**
     * A function to propagate a click on the "superteam" button
     */
    const handleClickOnSuperteam = (character: Character) => {
        return props.addRemoveCharacterFromSuperteam(character);
    }

    if (props.characters.length > 0) {
        return (
            <div className="row py-5" >
                {
                    props.characters.map((character) =>
                        <CharacterDisplayer key={character.id}
                            character={character}
                            addRemoveFromSuperteam={handleClickOnSuperteam} />)
                }
            </div>
        );
    }
    return (
        <div className="display-5 text-light py-5" >
            <em>No characters </em>
        </div>
    );
}

export default ListCharacters;