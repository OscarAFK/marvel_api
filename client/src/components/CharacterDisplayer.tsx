import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faCheck } from '@fortawesome/free-solid-svg-icons'
import { Character } from '../types/Character';
import React from 'react';
import { OperationOnCharacter } from '../types/OperationOnCharacter';

/**
 * A React component used to display a character.
 * 
 * @param character The character to display
 * @param addRemoveFromSuperteam A callback for when the character should be added/removed to the superteam 
 */
function CharacterDisplayer(props: { character: Character, addRemoveFromSuperteam: OperationOnCharacter }) {
    const { name, description, thumbnail, inSuperteam } = props.character;
    const { addRemoveFromSuperteam } = props;
    const altText = "Thumbnail of " + name;

    /**
     * A function to propagate a click on the "library" button
     */
    const handleClickOnSuperteam = () => {
        addRemoveFromSuperteam(props.character);
    }

    return (
        <div className="col-lg-3 col-md-6 col-12 d-flex align-items-stretch" >
            <div className="card mb-4 rounded-3 bg-dark card-over-effect" >
                <div className="overflow-hidden " >
                    <img alt={altText} src={thumbnail} className="card-img-top" />
                </div>
                < div className="card-img-overlay h-25" >
                    <button title="Add to the superteam" style={{ "width": "50px", "height": "50px" }
                    } className={"btn btn-outline-danger rounded-circle text-light wiggle-click"} onClick={handleClickOnSuperteam} >
                        {
                            < FontAwesomeIcon icon={inSuperteam ? faCheck : faUsers} />
                        }
                    </button>
                </div>
                < div className="card-body d-flex flex-column" >
                    <h4 className="card-title text-truncate border-bottom" title={name} > {name} </h4>
                    {
                        description.length === 0 &&
                        (
                            <p className="card-text" > <em>No description </em></p >
                        )
                    }
                    <p className="card-text overflow-auto" style={{ "maxHeight": "200px" }}> {description} </p>
                </div>
            </div>
        </div>
    );
}

export default CharacterDisplayer;