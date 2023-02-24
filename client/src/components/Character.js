import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faCheck } from '@fortawesome/free-solid-svg-icons'

/**
 * A React component used to display a character.
 * 
 * @param {string} id The id of the character
 * @param {string} name The name of the character
 * @param {string} description The description of the character
 * @param {string} thumbnail The thumbnail of the character
 * @param {boolean} inSuperteam If the character is in the superteam
 * @param {function} addRemoveFromSuperteam A callback for when the character should be added/removed to the superteam 
 */
function Character(props) {
    const { id, name, description, thumbnail, inSuperteam } = props;
    const { addRemoveFromSuperteam } = props;
    const altText = "Thumbnail of " + name;

    /**
     * A function to propagate a click on the "library" button
     */
    const handleClickOnSuperteam = () => {
        addRemoveFromSuperteam({ id, name, description, thumbnail, inSuperteam });
    }

    return (
        <div className="col-lg-3 col-md-6 col-12 d-flex align-items-stretch">
            <div className="card mb-4 rounded-3 bg-dark">
                <img alt={altText} src={thumbnail} className="card-img-top" />
                <div className="card-img-overlay h-25">
                    <button title="Add to the superteam" style={{ "width": "50px", "height": "50px" }} className={" btn btn-outline-danger rounded-circle text-light"} onClick={handleClickOnSuperteam}>
                        {
                            <FontAwesomeIcon icon={inSuperteam ? faCheck : faUsers} />
                        }
                    </button>
                </div>
                <div className="card-body d-flex flex-column">
                    <h4 className="card-title text-truncate border-bottom" title={name}>{name}</h4>
                    {
                        description.length === 0 &&
                        (
                            <p className="card-text"><em>No description</em></p>
                        )
                    }
                    <p className="card-text overflow-auto" style={{ "maxHeight": "200px" }}>{description}</p>
                </div>
            </div>
        </div>
    );
}

export default Character;