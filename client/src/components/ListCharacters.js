import Character from "./Character";

/**
 * A React component used to display a list of characters
 * 
 * @param {Array.<object>} characters The list of characters to display
 * @param {function} addRemoveCharacterFromSuperteam A callback for when the character should be added/removed to the superteam 
 */
function ListCharacters({ characters, addRemoveCharacterFromSuperteam }) {

    /**
     * A function to propagate a click on the "superteam" button
     */
    const handleClickOnSuperteam = (character) => {
        addRemoveCharacterFromSuperteam(character);
    }

    if (characters.length > 0) {
        return <div className="row">
            {characters.map((character) =>
                <Character key={character.id}
                    id={character.id}
                    name={character.name}
                    thumbnail={character.thumbnail}
                    description={character.description}
                    inSuperteam={character.inSuperteam}
                    addRemoveFromLibrary={handleClickOnSuperteam} />)}
        </div>
    }
}

export default ListCharacters;