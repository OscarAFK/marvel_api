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
        return (
            <div className="row py-5">
                {characters.map((character) =>
                    <Character key={character.id}
                        id={character.id}
                        name={character.name}
                        thumbnail={character.thumbnail}
                        description={character.description}
                        inSuperteam={character.inSuperteam}
                        addRemoveFromSuperteam={handleClickOnSuperteam} />)}
            </div>
        );
    }
    return (
        <div className="display-5 text-light py-5">
            <em>No characters</em>
        </div>
    );
}

export default ListCharacters;